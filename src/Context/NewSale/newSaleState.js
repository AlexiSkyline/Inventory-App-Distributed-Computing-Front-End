import React, { useReducer } from 'react';
import { types_newSales } from '../../Types/types.newSales';
import { NewSaleContext } from './NewSaleContext';
import { newSalesReducer } from './newSalesReducer';

export const NewSaleState = ( props ) => {
    const initialState = {
        cart: [],
        total: 0,
        iva: 0,
        totalSale: 0
    }

    const [ state, dispatch ] = useReducer( newSalesReducer, initialState );

    const addCart = ( product ) => {
        dispatch({
            type: types_newSales.AddCart,
            payload: product
        });
    }

    const removeCart = ( id ) => {
        dispatch({
            type: types_newSales.RemoveCart,
            payload: id
        });

        console.log( id );
    }
    
    return (
        <NewSaleContext.Provider
            value={{
                cart: state.cart,
                total: state.total,
                iva: state.iva,
                addCart,
                removeCart
            }}
        >
            { props.children }
        </NewSaleContext.Provider>
    );
}