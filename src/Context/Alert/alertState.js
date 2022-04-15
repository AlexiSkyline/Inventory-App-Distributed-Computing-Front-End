import { useReducer } from 'react';

import { AlertContext } from './AlertContext';
import { alertReducer } from './alertReducer';

export const AlertState = ( props ) => {
    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer( alertReducer, initialState );

    return (
        <AlertContext.Provider
            value={{
                alert: state.alert,
            }}
        >
            { props.children }
        </AlertContext.Provider>
    );
}