import { types_newSales } from '../../Types/types.newSales';

export const newSalesReducer = ( state, action ) => {
    switch ( action.type ) {
        case types_newSales.AddCart:
            return {
                ...state,
                cart: [ ...state.cart, action.payload ],
                total: state.total + action.payload.purchasePrice,
                iva: state.iva + action.payload.purchasePrice * 0.16,
                totalSale: state.totalSale + action.payload.purchasePrice * action.payload.amountProduct
            }
        case types_newSales.RemoveCart:
            return {
                ...state,
                cart: state.cart.filter( product => product.idProduct !== action.payload ),
                total: state.total - state.cart.find( product => product.idProduct === action.payload ).purchasePrice,
                iva: state.iva - state.cart.find( product => product.idProduct === action.payload ).purchasePrice * 0.16,
                totalSale: state.totalSale - state.cart.find( product => product.idProduct === action.payload ).purchasePrice * state.cart.find( product => product.idProduct === action.payload ).amountProduct
            }
        case types_newSales.ClearCart:
            return {
                ...state,
                cart: [],
                total: 0,
                iva: 0,
                totalSale: 0,
            }
        case types_newSales.AddSalesDetail:
            return {
                ...state,
                cart: [],
                total: 0,
                iva: 0,
                totalSale: 0,
                message: action.payload,
                typeMessage: 'alert-ok',
            }
        case types_newSales.AddSalesDetailFailed:
        case types_newSales.AddSaleFailed:
        case types_newSales.GetFolioFailed:
            return {
                ...state,
                cart: [],
                total: 0,
                iva: 0,
                totalSale: 0,
                error: true,
                message: action.payload,
                typeMessage: 'alert-error',
            }
        case types_newSales.removeMessages:
            return {
                ...state,
                message: '',
                typeMessage: '',
                error: false
            }
        case types_newSales.AddInfoSale:
            return {
                ...state,
                idSeller: action.payload.idSeller,
                idClient: action.payload.idClient,
                // idBusiness: action.payload.idBusiness,
                paymentType: action.payload.paymentType,
            }
        case types_newSales.GetFolio:
            return {
                ...state,
                folio: action.payload.folio
            }
        default: 
            return state;
    }
}