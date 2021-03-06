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

    const createUnitMs = async ( unitMeasurement ) => {
        try {
            const response = await clientAxios.post( path, {
                description: unitMeasurement.description
            });

            dispatch({
                type: types_unitMeasurement.addUnitMs,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: types_unitMeasurement.addUnitMsFailed,
                payload: error.response.data.errors.Description[0]
            });
        }

        deleteMessage();
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

    const updateUnitMs = async ( unitMeasurement ) => {
        try {
            const response = await clientAxios.put( `${ path }/${ unitMeasurement.id }`, {
                description: unitMeasurement.description
            });

            dispatch({
                type: types_unitMeasurement.updateUnitMs,
                payload: response.data.message
            });
            getUnitMs();
        } catch ( error ) {
            dispatch({
                type: types_unitMeasurement.updateUnitMsFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const deleteUnitM = async ( id ) => {
        try {
            const respose = await clientAxios.delete( `${ path }/${ id }` );
            dispatch({
                type: types_unitMeasurement.deleteUnitMs,
                payload: respose.data.message
            });
            getUnitMs();
        } catch ( error ) {
            dispatch({
                type: types_unitMeasurement.deleteUnitMFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const activeModeEdit = ( brand ) => {
        dispatch({
            type: types_unitMeasurement.activeModeEdit,
            payload: brand
        });
    }

    const desactiveModeEditUnitMs = () => {
        dispatch({
            type: types_unitMeasurement.desactiveModeEdit
        });
    }

    const modeSearchUnitMDesactive = () => {
        dispatch({
            type: types_unitMeasurement.searchUnitMDesactive
        });
    }

    const activeModeSearch = ( value ) => {
        if( value.trim() !== '' ) {
            dispatch({
                type: types_unitMeasurement.searchUnitMActive,
                payload: value
            });
        } else {
            modeSearchUnitMDesactive();
        }
    }

    return (
        <UnitMeasurementContext.Provider
            value={{
                unitMs: state.unitMs,
                message: state.message, 
                typeMessage: state.typeMessage,
                unitMsSearchFilter: state.unitMsSearchFilter,
                unitMsSearchFilterStatus: state.unitMsSearchFilterStatus,
                unitMsModeEdit: state.unitMsModeEdit,
                unitMsEdit: state.unitMsEdit,
                createUnitMs,
                getUnitMs,
                updateUnitMs,
                deleteUnitM,
                activeModeEdit,
                desactiveModeEditUnitMs,
                activeModeSearch,
                modeSearchUnitMDesactive
            }}
        >
            {props.children}
        </UnitMeasurementContext.Provider>
    );
}