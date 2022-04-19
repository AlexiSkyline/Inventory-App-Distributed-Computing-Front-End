import React, { useContext } from 'react';
import { ModalContext } from '../../../Context/Modal/ModalContext';

export const FloatingButton = () => {
    const modalContext = useContext( ModalContext );
    const { modalOpen, uiOpenModal } = modalContext;

    const handleClickNew = () => {
        uiOpenModal();
    }

    return (
        <>
            { !modalOpen  && <button className='fab' onClick={ handleClickNew } /> }
        </>
    );
}