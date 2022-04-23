import { types_unitMeasurement } from "../../Types/types.UnitMeasurement";

export const unitMeasurementReducer = ( state, action ) => {
    switch ( action.type ) {
        case types_unitMeasurement.addUnitMs:
            return {
                ...state,
                unitMs: [ ...state.unitMs, action.payload ],
                message: action.payload.message,
                typeMessage: 'alert-ok',
            }
        case types_unitMeasurement.getUnitMs:
            return {
                ...state,
                unitMs: action.payload
            }
        case types_unitMeasurement.updateUnitMs:
        case types_unitMeasurement.deleteUnitMs:
            return {
                ...state,
                message: action.payload,
                typeMessage: 'alert-ok'
            }
        case types_unitMeasurement.addUnitMsFailed:
        case types_unitMeasurement.getUnitMsFailed:
        case types_unitMeasurement.updateUnitMsFailed:    
        case types_unitMeasurement.deleteUnitMsFailed:
            return {
                ...state,
                error: true,
                message: action.payload,
                typeMessage: 'alert-error'
            }
        case types_unitMeasurement.searchUnitMActive:
            return {
                ...state,
                unitMsSearchFilterStatus: true,
                unitMsSearchFilter: state.unitMs.filter( unitMs => unitMs.description.toLowerCase().includes( action.payload.toLowerCase() ) )
            }
        case types_unitMeasurement.searchUnitMDesactive:
            return {
                ...state,
                unitMsSearchFilterStatus: false,
                unitMsSearchFilter: []
            }
        case types_unitMeasurement.activeModeEdit:
            return {
                ...state,
                unitMsModeEdit: true,
                unitMsEdit: action.payload
            }
        case types_unitMeasurement.desactiveModeEdit:
            return {
                ...state,
                unitMsModeEdit: false,
                unitMsEdit: null
            }
        case types_unitMeasurement.removeMessages:
            return {
                ...state,
                message: '',
                typeMessage: '',
                error: false
            }
        default:
            return state;
    }
}