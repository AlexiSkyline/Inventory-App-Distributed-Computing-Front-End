import React, { useReducer } from 'react';
import { clientAxios } from '../../Config/Axios';
import { types_client } from '../../Types/types.client';

import { ClientContext } from './ClientContext';
import { clientReducer } from './clientReducer';

export const ClientState = ( props ) => {
    const path = '/api/Client';
    const initialState = { 
        clientList: [],
        error: null,
        message: '',
        typeMessage: '',
        listClientFound: [],
        searchModeStatus: false,
        statusEditModeClient: false,
        infClientEdit: null,
    };

    const [ state, dispatch ] = useReducer( clientReducer, initialState );
    
    const deleteMessage = () => { 
        setTimeout(() => {
            dispatch({ type: types_client.removeMessages });
        }, 3000 );
    }

    const createClient = async ( data ) => { 
        try {
            const response = await clientAxios.post( path, {
                name: data.name,
                lastName: data.lastName,
                rfc: data.rfc,
                address: data.address,
                email: data.email,
                phoneNumber: data.phoneNumber
            });
            dispatch({
                type: types_client.addClient,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: types_client.addClientFailed,
                payload: error.response.data.errors.Description[0]
            });
        }

        deleteMessage();
    }

    const getClients = async () => {
        try {
            const response = await clientAxios.get( path );
            dispatch({
                type: types_client.getClient,
                payload: response.data.results
            });
        } catch (error) {
            dispatch({
                type: types_client.getClientFailed,
            });
        }
    }

    const updateClient = async ( data ) => {
        try {
            const response = await clientAxios.put( `${ path }/${ state.infClientEdit.id }`, {
                name: data.name,
                lastName: data.lastName,
                rfc: data.rfc,
                address: data.address,
                email: data.email,
                phoneNumber: data.phoneNumber
            });
            dispatch({
                type: types_client.updateClient,
                payload: response.data.message
            });
        } catch (error) {
            dispatch({
                type: types_client.updateClientFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const deleteClient = async ( id ) => {
        try {
            const response = await clientAxios.delete( `${ path }/${ id }` );
            dispatch({
                type: types_client.deleteClient,
                payload: response.data.message
            });
        } catch (error) {
            dispatch({
                type: types_client.deleteClientFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const activeModeEdit = ( client ) => {
        dispatch({
            type: types_client.activeModeEdit,
            payload: client
        });
    }

    const desactiveModeEdit = () => {
        dispatch({
            type: types_client.desactiveModeEdit
        });
    }

    const disactiveClientSearchMode = () => {
        dispatch({
            type: types_client.searchClientDesactive
        });
    }

    const searchClient = async ( value ) => {
        if( value.trim() !== '' ) {
            dispatch({
                type: types_client.searchClientActive,
                payload: value
            });
        } else {
            disactiveClientSearchMode();
        }
    }

    return (
        <ClientContext.Provider
            value={{
                clientList: state.clientList,
                error: state.error,
                message: state.message,
                typeMessage: state.typeMessage,
                listClientFound: state.listClientFound,
                searchModeStatus: state.searchModeStatus,
                statusEditModeClient: state.statusEditModeClient,
                infClientEdit: state.infClientEdit,
                createClient,
                getClients,
                updateClient,
                deleteClient,
                deleteMessage,
                activeModeEdit,
                desactiveModeEdit,
                searchClient,
                disactiveClientSearchMode
            }}
        >
            { props.children }
        </ClientContext.Provider>
    );
}