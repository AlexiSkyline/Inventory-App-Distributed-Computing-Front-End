import React, { useReducer } from 'react';
import { clientAxios } from '../../Config/Axios';
import { types_provider } from '../../Types/types.provider';
import { ProviderContext } from './ProviderContext';
import { providerReducer } from './providerReducer';

export const ProviderState = ( props ) => {
    const path = '/api/Provider';
    const initialState = {
        providerList: [],
        error: null,
        message: '',
        typeMessage: '',
        listProviderFound: [],
        searchModeStatus: false,
        statusEditModeProvider: false,
        infProviderEdit: null
    }

    const [ state, dispatch ] = useReducer( providerReducer, initialState );

    const deleteMessage = () => { 
        setTimeout(() => {
            dispatch({ type: types_provider.removeMessages });
        }, 3000 );
    }

    const createProvider = async ( data ) => {
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
                type: types_provider.addProvider,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: types_provider.addProviderFailed,
                payload: error.response.data.errors.Description[0]
            });
        }

        deleteMessage();
    }

    const getProviders = async () => {
        try {
            const response = await clientAxios.get( path );
            dispatch({
                type: types_provider.getProviders,
                payload: response.data.results
            });
        } catch (error) {
            dispatch({
                type: types_provider.addProviderFailed
            });
        }
    }

    const updateProvider = async ( data ) => {
        try {
            const response = await clientAxios.put( `${ path }/${ state.infProviderEdit.id }`, {
                name: data.name,
                lastName: data.lastName,
                rfc: data.rfc,
                address: data.address,
                email: data.email,
                phoneNumber: data.phoneNumber
            });
            dispatch({
                type: types_provider.updateProvider,
                payload: response.data.message
            });
        } catch (error) {
            dispatch({
                type: types_provider.updateProviderFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const deleteProvider = async ( id ) => {
        try {
            const response = await clientAxios.delete( `${ path }/${ id }` );
            dispatch({
                type: types_provider.deleteProvider,
                payload: response.data.message
            });
        } catch (error) {
            dispatch({
                type: types_provider.updateProviderFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const activeModeEdit = ( provider ) => {
        dispatch({
            type: types_provider.activeModeEdit,
            payload: provider
        });
    }

    const desactiveModeEdit = () => {
        setTimeout(() => {
            dispatch({
                type: types_provider.desactiveModeEdit
            });
        } , 100);
    }

    const disactiveProviderSearchMode = () => {
        dispatch({
            type: types_provider.searchProviderDesactive
        });
    }

    const searchProvider = async ( value ) => {
        if( value.trim() !== '' ) {
            dispatch({
                type: types_provider.searchProviderActive,
                payload: value
            });
        } else {
            disactiveProviderSearchMode();
        }
    }

    return (
        <ProviderContext.Provider
            value={{
                providerList: state.providerList,
                message: state.message,
                typeMessage: state.typeMessage,
                listProviderFound: state.listProviderFound,
                searchModeStatus: state.searchModeStatus,
                statusEditModeProvider: state.statusEditModeProvider,
                infProviderEdit: state.infProviderEdit,
                createProvider,
                getProviders,
                updateProvider,
                deleteProvider,
                deleteMessage,
                activeModeEdit,
                desactiveModeEdit,
                searchProvider,
                disactiveProviderSearchMode
            }}
        >
            {props.children}
        </ProviderContext.Provider>
    );
}