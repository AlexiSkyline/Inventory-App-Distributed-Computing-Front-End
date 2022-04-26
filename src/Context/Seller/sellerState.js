import React, { useReducer } from 'react'
import { SellerContext } from './SellerContext';
import { sellerReducer } from './sellerReducer';

export const SellerState = ( props ) => {
    const initialState = {
        sellerList: [],
        error: null,
        message: '',
        typeMessage: '',
        listSellerFound: [],
        searchModeStatus: false,
        statusEditModeSeller: false,
        infSellerEdit: null,
    }
    const [state, dispatch] = useReducer(sellerReducer, initialState);

    return (
        <SellerContext.Provider
            value={{
                sellerList: state.sellerList,
                message: state.message,
                typeMessage: state.typeMessage,
                listSellerFound: state.listSellerFound,
                searchModeStatus: state.searchModeStatus,
                statusEditModeSeller: state.statusEditModeSeller,
                infSellerEdit: state.infSellerEdit,
            }}
        >
            { props.children }
        </SellerContext.Provider>
    );
}