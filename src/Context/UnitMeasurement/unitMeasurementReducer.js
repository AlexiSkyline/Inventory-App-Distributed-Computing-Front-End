import { types_unitMeasurement } from "../../Types/types.UnitMeasurement";

export const unitMeasurementReducer = ( state, action ) => {
    switch ( action.type ) {
        case types_unitMeasurement.getUnitMs:
            return {
                ...state,
                unitMs: action.payload
            }
        case types_unitMeasurement.deleteUnitMs:
            return {
                ...state,
                message: action.payload,
                typeMessage: 'alert-ok'
            }
        case types_unitMeasurement.getUnitMsFailed:
        case types_unitMeasurement.deleteUnitMsFailed:
            return {
                ...state,
                error: true,
                message: action.payload,
                typeMessage: 'alert-error'
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