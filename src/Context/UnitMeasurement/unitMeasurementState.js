import React from 'react';
import { clientAxios } from '../../Config/Axios';
import { types_unitMeasurement } from '../../Types/types.UnitMeasurement';
import { UnitMeasurementContext } from './UnitMeasurementContext';
import { unitMeasurementReducer } from './unitMeasurementReducer';

export const UnitMeasurementState = ( props ) => {
    const path = '/api/UnitMeasurement';
    const initialState = {
        unitMs: [],
        error: null,
        message: '',
        typeMessage: '',
        unitMsSearchFilter: [],
        unitMsSearchFilterStatus: false,
        unitMsModeEdit: false,
        unitMsEdit: null
    }

    const [ state, dispatch ] = React.useReducer( unitMeasurementReducer, initialState );

    const deleteMessage = () => {
        setTimeout(() => {
            dispatch({ type: types_unitMeasurement.removeMessages });
        } , 3000);
    }

    const getUnitMs = async () => {
        try {
            const response = await clientAxios.get( path );
            dispatch({
                type: types_unitMeasurement.getUnitMs,
                payload: response.data.results
            });
        } catch ( error ) {
            dispatch({
                type: types_unitMeasurement.getUnitMsFailed,
            });
        }
    }

    const deleteUnitM = async ( id ) => {
        try {
            const respose = await clientAxios.delete( `${ path }/${ id }` );
            dispatch({
                type: types_unitMeasurement.deleteUnitMs,
                payload: respose.data.message
            });
        } catch ( error ) {
            dispatch({
                type: types_unitMeasurement.deleteUnitMFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    return (
        <UnitMeasurementContext.Provider
            value={{
                unitMs: state.unitMs,
                message: state.message, 
                typeMessage: state.typeMessage,
                unitMsModeEdit: state.unitMsModeEdit,
                getUnitMs,
                deleteUnitM
            }}
        >
            {props.children}
        </UnitMeasurementContext.Provider>
    );
}