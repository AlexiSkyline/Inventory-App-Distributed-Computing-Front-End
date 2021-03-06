import { types_sales } from '../../Types/types.sales';

export const salesReducer = ( state, action ) =>  {
    switch( action.type ) {
        case types_sales.getSales:
            return {
                ...state,
                salesList: action.payload
            }
        case types_sales.updateSales:
        case types_sales.deleteSales:
            return {
                ...state,
                message: action.payload,
                typeMessage: 'alert-ok'
            }
        case types_sales.getSalesFailed:
        case types_sales.updateSalesFailed:
        case types_sales.deleteSalesFailed:
            return {
                ...state,
                error: true,
                message: action.payload,
                typeMessage: 'alert-error'
            }
        case types_sales.activeModeEdit:
            return {
                ...state,
                statusEditModeSales: true,
                infSalesEdit: action.payload
            }
        case types_sales.desactiveModeEdit:
            return {
                ...state,
                statusEditModeSales: false,
                infSalesEdit: null
            }
        case types_sales.searchSalesActive:
            return {
                ...state,
                searchModeStatus: true,
                listSalesFound: state.salesList.filter( sales => sales.folio === Number( action.payload ) )
            }
        case types_sales.searchSalesDesactive:
            return {
                ...state,
                searchModeStatus: false,
                listSalesFound: []
            }
        case types_sales.removeMessages:
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