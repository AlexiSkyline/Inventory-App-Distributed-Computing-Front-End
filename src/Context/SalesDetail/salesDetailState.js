import React, { useReducer } from 'react';
import { clientAxios } from '../../Config/Axios';
import { types_SalesDetail } from '../../Types/types.salesDetailReducer';
import { SalesDetailContext } from './SalesDetailContext'
import { salesDetailReducer } from './salesDetailReducer';

export const SalesDetailState = ( props ) => {
    const path = '/api/SalesDetail';
    const initialState = { 
        salesDetailList: [],
        error: null,
        message: '',
        typeMessage: '',
        listSalesDetailFound: [],
        searchModeStatus: false,
        statusEditModeSalesDetail: false,
        infSalesDetailEdit: null
    }

    const [ state, dispatch ] = useReducer( salesDetailReducer, initialState );

    const deleteMessage = () => { 
        setTimeout(() => {
            dispatch({ type: types_SalesDetail.removeMessages });
        }, 3000 );
    }

    const getSalesDetail = async () => {
        try {
            const response = await clientAxios.get( path );
            dispatch({
                type: types_SalesDetail.getSalesDetail,
                payload: response.data.results
            });
        } catch (error) {
            dispatch({
                type: types_SalesDetail.getSalesDetailFailed
            });
        }
    }

    const updateSalesDetail = async ( data ) => {
        try {
            const response = await clientAxios.put( `${ path }/${ state.infSalesDetailEdit.id }`, {
                id: data.id,
                idSale: data.idSale,
                idProduct: data.idProduct,
                amountProduct: data.amountProduct,
                purchasePrice: data.purchasePrice,
                amount: data.amount,
                date: data.date
            });
            dispatch({
                type: types_SalesDetail.updateSalesDetail,
                payload: response.data.message
            });
        } catch (error) {
            dispatch({
                type: types_SalesDetail.updateSalesDetailFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const deleteSalesDetail = async ( id ) => {
        try {
            const response = await clientAxios.delete( `${ path }/${ id }` );
            dispatch({
                type: types_SalesDetail.deleteSalesDetail,
                payload: response.data.message
            });
        } catch (error) {
            dispatch({
                type: types_SalesDetail.deleteSalesDetailFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const activeModeEdit = ( data ) => {
        dispatch({
            type: types_SalesDetail.activeModeEdit,
            payload: data
        });
    }

    const desactiveModeEdit = () => {
        dispatch({
            type: types_SalesDetail.desactiveModeEdit
        });
    }

    return (
        <SalesDetailContext.Provider 
            value={{
                salesDetailList: state.salesDetailList,
                message: state.message,
                typeMessage: state.typeMessage,
                listSalesDetailFound: state.listSalesDetailFound,
                searchModeStatus: state.searchModeStatus,
                statusEditModeSalesDetail: state.statusEditModeSalesDetail,
                infSalesDetailEdit: state.infSalesDetailEdit,
                getSalesDetail,
                updateSalesDetail,
                deleteSalesDetail,
                deleteMessage,
                activeModeEdit,
                desactiveModeEdit
            }}
        >
            {props.children}
        </SalesDetailContext.Provider>
    );
}