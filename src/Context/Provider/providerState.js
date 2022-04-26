import React, { useReducer } from 'react';
import { ProviderContext } from './ProviderContext';
import { providerReducer } from './providerReducer';

export const providerState = ( props ) => {
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
            }}
        >
            {props.children}
        </ProviderContext.Provider>
    );
}