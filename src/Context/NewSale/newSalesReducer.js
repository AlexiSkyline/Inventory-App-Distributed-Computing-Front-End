import { types_newSales } from '../../Types/types.newSales';

export const newSalesReducer = ( state, action ) => {
    switch ( action.type ) {
        case types_newSales.AddCart:
            return {
                ...state,
                cart: [ ...state.cart, action.payload ],
                total: state.total + action.payload.purchasePrice,
                iva: state.iva + action.payload.purchasePrice * 0.16
            }
        default: 
            return state;
    }
}