import React, { useContext } from 'react';
import { ModalContext } from '../../../Context/Modal/ModalContext';

export const FloatingButtonClose = () => {
    const modalContext = useContext( ModalContext );
    const { modalOpen, uiCloseModal } = modalContext;

    const handleClickNew = () => {
        uiCloseModal();
    }

    return (
        <>
            { modalOpen && <button className='fab fab-close' onClick={ handleClickNew } /> }
        </>
    );
}