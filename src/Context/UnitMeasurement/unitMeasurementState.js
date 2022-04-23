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

    return (
        <UnitMeasurementContext.Provider
            value={{
                unitMs: state.unitMs,
                getUnitMs
            }}
        >
            {props.children}
        </UnitMeasurementContext.Provider>
    );
}