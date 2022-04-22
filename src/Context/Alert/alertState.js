import { useReducer } from 'react';
import { types } from '../../Types/types';

import { AlertContext } from './AlertContext';
import { alertReducer } from './alertReducer';

export const AlertState = ( props ) => {
    const initialState = {
        alert: {
            msg: null,
            type: null
        },
        globalMessage: false,
    }

    const [state, dispatch] = useReducer( alertReducer, initialState );

    // Todo: Funciones para el dispatch
    const showAlert = ( msg, type ) => { 
        dispatch({
            type: types.showAlert,
            payload: { msg, type }
        });

        // * Después de 5 segundos borra la alerta
        setTimeout(() => {
            dispatch({
                type: types.removeAlert
            });
        }, 3000);
    }

    const addGlobalMessage = ( message ) => {
        dispatch({
            type: types.addGlobalMessage,
            payload: message
        });
    }

    return (
        <AlertContext.Provider
            value={{
                alert: state.alert,
                showAlert,
                addGlobalMessage
            }}
        >
            { props.children }
        </AlertContext.Provider>
    );
}