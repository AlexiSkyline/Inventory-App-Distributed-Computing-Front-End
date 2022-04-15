import { useReducer } from 'react';
import { types } from '../../Types/types';

import { AlertContext } from './AlertContext';
import { alertReducer } from './alertReducer';

export const AlertState = ( props ) => {
    const initialState = {
        alert: null
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
        }, 5000);
    }

    return (
        <AlertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}
        >
            { props.children }
        </AlertContext.Provider>
    );
}