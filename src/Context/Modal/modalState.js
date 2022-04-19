import React, { useReducer } from 'react'
import { ModalContext } from './ModalContext';
import { modalReducer } from './modalReducer';
import { types } from '../../Types/types';

export const ModalState = ( props ) => {
    const initialState = {
        modalOpen: false,
    }

    const [ state, dispatch ] = useReducer( modalReducer, initialState );

    const uiOpenModal = () => dispatch({ type: types.uiOpenModal });
    const uiCloseModal = () => dispatch({ type: types.uiCloseModal });

    return (
        <ModalContext.Provider
            value={{
                modalOpen: state.modalOpen,
                uiOpenModal,
                uiCloseModal
            }}
        >
            { props.children }
        </ModalContext.Provider>
    );
}