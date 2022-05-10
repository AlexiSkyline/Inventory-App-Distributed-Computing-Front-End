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
    const pathSales       = '/api/Sales';
    const initialState = {
        cart: [],
        total: 0,
        iva: 0,
        totalSale: 0,
        date: formatDate,
        error: false,
        message: '',
        typeMessage: '',
        idSeller: '',
        idClient: '',
        idBusiness: '',
        paymentType: '',
        folio: '',
    }

    const [ state, dispatch ] = useReducer( newSalesReducer, initialState );

    const deleteMessage = () => { 
        setTimeout(() => {
            dispatch({ type: types_newSales.removeMessages });
        }, 3000 );
    }

    const getFolio = async () => {
        try {
            const response = await clientAxios.get( `${ pathSales }/Folio` );
            dispatch({ 
                type: types_newSales.GetFolio, 
                payload: response.data 
            });
        } catch (error) {
            dispatch({
                type: types_newSales.GetFolioFailed,
                payload: 'Error al obtener el folio'
            });
        }
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
            state.cart.forEach( product => {
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

    const AddInfoSale =  ( infoSale ) => {
        dispatch({
            type: types_newSales.AddInfoSale,
            payload: infoSale
        });
    }

    const addSale = async () => {
        try {
            const response = await clientAxios.post( pathSales, {
                date: state.date,
                idSeller: state.idSeller,
                idClient: state.idClient,
                folio: state.folio,
                idBusiness: 'ab77da93-9766-48fc-885e-18faa43d93a6',
                total: state.totalSale,
                iva: state.iva,
                subTotal: state.totalSale + state.iva,
                paymentType: state.paymentType,
            });
            const idSale = response.data.id;
            await addSalesDetail( idSale );
        } catch (error) {
            dispatch({
                type: types_newSales.AddInfoSale,
                payload: error.response.data.message
            });
        }

        deleteMessage();
        getFolio();
    }
    
    return (
        <NewSaleContext.Provider
            value={{
                cart: state.cart,
                total: state.total,
                iva: state.iva,
                totalSale: state.totalSale,
                date: state.date,
                message: state.message,
                typeMessage: state.typeMessage,
                folio: state.folio,
                addCart,
                removeCart,
                clearCart,
                addSalesDetail,
                AddInfoSale,
                addSale,
                getFolio,
                deleteMessage
            }}
        >
            { props.children }
        </NewSaleContext.Provider>
    );
}