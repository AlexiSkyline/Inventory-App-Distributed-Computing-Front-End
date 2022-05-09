import React, { useReducer } from 'react';
import { types_newSales } from '../../Types/types.newSales';
import { NewSaleContext } from './NewSaleContext';
import { newSalesReducer } from './newSalesReducer';

export const NewSaleState = ( props ) => {
    const today = Date.now();
    const date = new Date( today );
    const formatDate = date.getFullYear() + '-' + 
                ('0' + (date.getMonth()+1)).slice(-2) + '-' +
                ('0' + date.getDate()).slice(-2);

    const initialState = {
        cart: [],
        total: 0,
        iva: 0,
        totalSale: 0,
        date: formatDate,
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
    }

    const clearCart = () => {
        dispatch({
            type: types_newSales.ClearCart,
        });
    }
    
    return (
        <NewSaleContext.Provider
            value={{
                cart: state.cart,
                total: state.total,
                iva: state.iva,
                totalSale: state.totalSale,
                date: state.date,
                addCart,
                removeCart,
                clearCart,
            }}
        >
            { props.children }
        </NewSaleContext.Provider>
    );
}