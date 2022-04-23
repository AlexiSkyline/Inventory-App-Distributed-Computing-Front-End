import React from 'react';
import { UnitMeasurementContext } from './UnitMeasurementContext';
import { unitMeasurementReducer } from './unitMeasurementReducer';

export const UnitMeasurementState = ( props ) => {
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

    return (
        <UnitMeasurementContext.Provider
            value={{}}
        >
            {props.children}
        </UnitMeasurementContext.Provider>
    );
}