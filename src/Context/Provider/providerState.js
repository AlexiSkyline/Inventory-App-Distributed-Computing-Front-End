import React, { useReducer } from 'react';
import { clientAxios } from '../../Config/Axios';
import { types_provider } from '../../Types/types.provider';
import { ProviderContext } from './ProviderContext';
import { providerReducer } from './providerReducer';

export const providerState = ( props ) => {
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
                deleteMessage,
            }}
        >
            {props.children}
        </ProviderContext.Provider>
    );
}