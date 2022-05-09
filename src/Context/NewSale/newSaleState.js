import React, { useReducer } from 'react';
import { clientAxios } from '../../Config/Axios';
import { types_newSales } from '../../Types/types.newSales';
import { NewSaleContext } from './NewSaleContext';
import { newSalesReducer } from './newSalesReducer';

export const NewSaleState = ( props ) => {
    const today = Date.now();
    const date = new Date( today );
    const formatDate = date.getFullYear() + '-' + 
                ('0' + (date.getMonth()+1)).slice(-2) + '-' +
                ('0' + date.getDate()).slice(-2);

    const pathSalesDetail = '/api/SalesDetail';
    const initialState = {
        cart: [],
        total: 0,
        iva: 0,
        totalSale: 0,
        date: formatDate,
        error: null,
        message: '',
        typeMessage: '',
    }

    const [ state, dispatch ] = useReducer( newSalesReducer, initialState );

    const deleteMessage = () => { 
        setTimeout(() => {
            dispatch({ type: types_newSales.removeMessages });
        }, 3000 );
    }

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

    const addSalesDetail = async ( idSale ) => {
        try {
            const response = state.cart.forEach( product => {
                clientAxios.post( pathSalesDetail, {
                    idSale: idSale,
                    idProduct: product.idProduct,
                    amountProduct: product.amountProduct,
                    purchasePrice: product.purchasePrice,
                    amount: product.amountProduct * product.purchasePrice,
                    date: state.date
                }).then( response => response.data.message ).catch( error => error.response.data );
            });
            dispatch({
                type: types_newSales.AddSalesDetail,
                payload: 'Venta realizada con éxito'
            });
        } catch (error) {
            dispatch({
                type: types_newSales.AddSalesDetail,
                payload: error.response.data.message
            });
        }

        deleteMessage();
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
                addSalesDetail,
                deleteMessage
            }}
        >
            { props.children }
        </NewSaleContext.Provider>
    );
}