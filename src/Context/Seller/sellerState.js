import React, { useReducer } from 'react';
import { clientAxios } from '../../Config/Axios';
import { types_seller } from '../../Types/types.seller';
import { SellerContext } from './SellerContext';
import { sellerReducer } from './sellerReducer';

export const SellerState = ( props ) => {
    const path = '/api/Seller';
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

    const [ state, dispatch ] = useReducer( sellerReducer, initialState );

    const deleteMessage = () => { 
        setTimeout(() => {
            dispatch({ type: types_seller.removeMessages });
        }, 3000 );
    }

    const createSeller = async ( data ) => {
        try {
            const response = await clientAxios.post( path, {
                name: data.name,
                lastName: data.lastName,
                rfc: data.rfc,
                address: data.address,
                email: data.email,
                phoneNumber: data.phoneNumber,
                userName: data.userName,
                password: data.password
            });
            dispatch({
                type: types_seller.addSeller,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: types_seller.addSellerFailed,
                payload: error.response.data.errors.Description[0]
            });
        }

        deleteMessage();
    }

    const getSellers = async () => {
        try {
            const response = await clientAxios.get( path );
            dispatch({
                type: types_seller.getSellers,
                payload: response.data.results
            });
        } catch (error) {
            dispatch({
                type: types_seller.getSellersFailed,
            });
        }
    }

    const updateSeller = async ( data ) => {
        try {
            const response = await clientAxios.put( `${ path }/${ state.infSellerEdit.id }`, {
                name: data.name,
                lastName: data.lastName,
                rfc: data.rfc,
                address: data.address,
                email: data.email,
                phoneNumber: data.phoneNumber,
                userName: data.userName,
                password: data.password
            });
            dispatch({
                type: types_seller.updateSeller,
                payload: response.data.message
            });
            getSellers();
        } catch (error) {
            dispatch({
                type: types_seller.updateSellerFailed,
                payload: error.response.data.message
            });
        }
        
        deleteMessage();
    }

    const deleteSeller = async ( id ) => {
        try {
            const response = await clientAxios.delete( `${ path }/${ id }` );
            dispatch({
                type: types_seller.deleteSeller,
                payload: response.data.message
            });
            getSellers();
        } catch (error) {
            dispatch({
                type: types_seller.deleteSellerFailed,
                payload: error.response.data.message
            });
        }
        
        deleteMessage();
    }

    const activeModeEdit = ( seller ) => {
        seller.password = '123456';

        dispatch({
            type: types_seller.activeModeEdit,
            payload: seller
        });
    }

    const desactiveModeEditSeller = () => {
        dispatch({
            type: types_seller.desactiveModeEdit
        });
    }

    const disactiveSellerSearchMode = () => {
        dispatch({
            type: types_seller.searchSellerDesactive
        });
    }

    const searchSeller = async ( value ) => {
        if( value.trim() !== '' ) {
            dispatch({
                type: types_seller.searchSellerActive,
                payload: value
            });
        } else {
            disactiveSellerSearchMode();
        }
    } 

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
                createSeller,
                getSellers,
                updateSeller,
                deleteSeller,
                activeModeEdit,
                desactiveModeEditSeller,
                deleteMessage,
                searchSeller,
                disactiveSellerSearchMode
            }}
        >
            { props.children }
        </SellerContext.Provider>
    );
}