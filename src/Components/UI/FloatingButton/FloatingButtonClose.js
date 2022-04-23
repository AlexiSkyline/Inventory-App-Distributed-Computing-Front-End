import React, { useContext } from 'react';
import { ModalContext } from '../../../Context/Modal/ModalContext';

export const FloatingButtonClose = ({ desactiveModeEdit }) => {
    const modalContext = useContext( ModalContext );
    const { modalOpen, uiCloseModal } = modalContext;

    const handleClickNew = () => {
        uiCloseModal();
        desactiveModeEdit();
    }

    return (
        <>
            { modalOpen && <button className='fab fab-close' onClick={ handleClickNew } /> }
        </>
    );
}