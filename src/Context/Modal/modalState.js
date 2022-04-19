import React, { useReducer } from 'react'
import { ModalContext } from './ModalContext';
import { modalReducer } from './modalReducer';

export const ModalState = ( props ) => {
    const initialState = {
        modalOpen: false,
    }

    const [ state, dispatch ] = useReducer( modalReducer, initialState );
    
    return (
        <ModalContext.Provider
            value={{
                modalOpen: state.modalOpen,
            }}
        >
            { props.children }
        </ModalContext.Provider>
    );
}