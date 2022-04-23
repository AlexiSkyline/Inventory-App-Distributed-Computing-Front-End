import { types_unitMeasurement } from "../../Types/types.UnitMeasurement";

export const unitMeasurementReducer = ( state, action ) => {
    switch ( action.type ) {
        case types_unitMeasurement.getUnitMs:
            return {
                ...state,
                unitMs: action.payload
            }
        case types_unitMeasurement.getUnitMsFailed:
            return {
                ...state,
                error: true,
                message: action.payload,
                typeMessage: 'alert-error'
            }
        default:
            return state;
    }
}