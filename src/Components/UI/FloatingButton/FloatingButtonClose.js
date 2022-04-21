import React, { useContext } from 'react';
import { ModalContext } from '../../../Context/Modal/ModalContext';
import { ProductContext } from '../../../Context/Product/ProductContext';

export const FloatingButtonClose = () => {
    const modalContext = useContext( ModalContext );
    const { modalOpen, uiCloseModal } = modalContext;

    const productContext = useContext( ProductContext );
    const { desactiveModeEdit } = productContext;

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