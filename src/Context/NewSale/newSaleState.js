import React, { useReducer } from 'react';
import { NewSaleContext } from './NewSaleContext';
import { newSalesReducer } from './newSalesReducer';

export const NewSaleState = ( props ) => {
    const initialState = {
        cart: [],
        total: 0,
        iva: 0
    }

    const [ state, dispatch ] = useReducer( newSalesReducer, initialState );
    
    return (
        <NewSaleContext.Provider
            value={{
                cart: state.cart,
                total: state.total,
                iva: state.iva,
            }}
        >
            { props.children }
        </NewSaleContext.Provider>
    );
}