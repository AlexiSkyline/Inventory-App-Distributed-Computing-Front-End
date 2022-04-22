import { types_brand } from '../../Types/types.brand';

export const brandReducer = ( state, action ) => { 
    switch( action.type ) {
        case types_brand.getBrands:
            return {
                ...state,
                brands: action.payload,
            }
        case types_brand.deleteBrand:
            return {
                ...state,
                message: action.payload,
                typeMessage: 'alert-ok'
            }
        case types_brand.deleteBrandFailed:
            return {
                ...state,
                message: action.payload,
                typeMessage: 'alert-error'
            }
        default :
            return state;
    }
}