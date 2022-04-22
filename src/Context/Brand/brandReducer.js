import { types_brand } from '../../Types/types.brand';

export const brandReducer = ( state, action ) => { 
    switch( action.type ) {
        case types_brand.getBrands:
            return {
                ...state,
                brands: action.payload,
                loading: false,
            }
        default :
            return state;
    }
}