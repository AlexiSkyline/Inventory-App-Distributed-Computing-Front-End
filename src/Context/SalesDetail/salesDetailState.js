import React, { useReducer } from 'react';
import { types_SalesDetail } from '../../Types/types.salesDetailReducer';
import { SalesDetailContext } from './SalesDetailContext'
import { salesDetailReducer } from './salesDetailReducer';

export const SalesDetailState = ( props ) => {
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
            }}
        >
            {props.children}
        </SalesDetailContext.Provider>
    );
}