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
        default: 
            return state;
    }
}