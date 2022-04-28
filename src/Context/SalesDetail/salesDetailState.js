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
                deleteMessage,
            }}
        >
            {props.children}
        </SalesDetailContext.Provider>
    );
}