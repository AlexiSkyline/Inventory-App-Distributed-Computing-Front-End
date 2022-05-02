import React, { useReducer } from 'react';
import { clientAxios } from '../../Config/Axios';
import { types_sales } from '../../Types/types.sales';
import { SalesContext } from './SalesContext';
import { salesReducer } from './salesReducer';

export const SalesState = ( props ) => {
    const path = '/api/Sales';
    const initialState = {
        salesList: [],
        error: null,
        message: '',
        typeMessage: '',
        listSalesFound: [],
        searchModeStatus: false,
        statusEditModeSales: false,
        infSalesEdit: null
    }

    const [ state, dispatch ] = useReducer( salesReducer, initialState );

    const deleteMessage = () => {
        dispatch({
            type: types_sales.removeMessages
        });
    }

    const getSales = async () => {
        try {
            const response = await clientAxios.get( path );
            dispatch({
                type: types_sales.getSales,
                payload: response.data.results
            });
        } catch (error) {
            dispatch({
                type: types_sales.getSalesFailed
            });
        }
    }

    const updateSales = async ( data ) => {
        try {
            const response = await clientAxios.put( `${ path }/${ data.id }`, {
                date: data.date,
                idSeller: data.idSeller,
                idClient: data.idClient,
                folio: data.folio,
                idBusiness: data.idBusiness,
                total: data.total,
                iva: data.iva,
                subTotal: data.subTotal,
                paymentType: data.paymentType
            });
            dispatch({
                type: types_sales.updateSales,
                payload: response.data.message
            });
            getSales();
        } catch (error) {
            dispatch({
                type: types_sales.updateSalesFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const deleteSales = async ( id ) => {
        try {
            const response = await clientAxios.delete( `${ path }/${ id }` );
            dispatch({
                type: types_sales.deleteSales,
                payload: response.data.message
            });
            getSales();
        } catch (error) {
            dispatch({
                type: types_sales.deleteSalesFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }
    
    return (
        <SalesContext.Provider 
            value={{
                salesList: state.salesList,
                message: state.message,
                typeMessage: state.typeMessage,
                listSalesFound: state.listSalesFound,
                searchModeStatus: state.searchModeStatus,
                statusEditModeSales: state.statusEditModeSales,
                infSalesEdit: state.infSalesEdit,
                getSales,
                updateSales,
                deleteSales,
                deleteMessage,            
            }}
        >
            { props.children }
        </SalesContext.Provider>
    );
}