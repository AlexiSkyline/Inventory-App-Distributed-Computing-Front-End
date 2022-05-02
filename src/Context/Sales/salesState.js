import React, { useReducer } from 'react';
import { types_sales } from '../../Types/types.sales';
import { SalesContext } from './SalesContext';
import { salesReducer } from './salesReducer';

export const SalesState = ( props ) => {
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
                deleteMessage,            
            }}
        >
            { props.children }
        </SalesContext.Provider>
    );
}