import { types_brand } from '../../Types/types.brand';

export const brandReducer = ( state, action ) => { 
    switch( action.type ) {
        case types_brand.addBrand:
            return {
                ...state,
                brands: [ ...state.brands, action.payload ],
                message: action.payload.message,
                typeMessage: 'alert-ok'
            }
        case types_brand.getBrands:
            return {
                ...state,
                brands: action.payload,
            }
        case types_brand.updateBrand:
        case types_brand.deleteBrand:
            return {
                ...state,
                message: action.payload,
                typeMessage: 'alert-ok'
            }
        case types_brand.addBrandFailed:
        case types_brand.getBrandsFailed:
        case types_brand.deleteBrandFailed:
            return {
                ...state,
                error: true,
                message: action.payload,
                typeMessage: 'alert-error'
            }
        case types_brand.searchBrandActive:
            return {
                ...state,
                brandSearchFilterStatus: true,
                brandSearchFilter: state.brands.filter( brand => brand.description.toLowerCase().includes( action.payload.toLowerCase() ) )
            }
        case types_brand.searchBrandDesactive:
            return {
                ...state,
                brandSearchFilterStatus: false,
                brandSearchFilter: []
            }
        case types_brand.activeModeEdit:
            return {
                ...state,
                brandModeEdit: true,
                brandEdit: action.payload
            }
        case types_brand.desactiveModeEdit:
            return {
                ...state,
                brandModeEdit: false,
                brandEdit: null
            }
        case types_brand.removeMessages:
            return {
                ...state,
                message: '',
                typeMessage: '',
                error: false
            }
        default :
            return state;
    }
}