import React, { useContext, useState } from 'react';
import Proptypes from 'prop-types';
import Modal from 'react-modal';

import { ModalContext } from '../../Context/Modal/ModalContext';
import { SalesDetailContext } from '../../Context/SalesDetail/SalesDetailContext';

export const SalesDetailModal = ({ handleResetSearchInput }) => {
    const salesDetailContext = useContext( SalesDetailContext );
    const { statusEditModeSalesDetail, infSalesDetailEdit, updateSalesDetail, 
                disactiveSalesDetailSearchMode } = salesDetailContext;

    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const [ formValues, setformValues ] = useState({ 
        idSale: '', 
        idProduct: '', 
        amountProduct: '', 
        purchasePrice: '', 
        amount: '', 
        date: ''
    });

    const { idSale ,idProduct ,amountProduct ,purchasePrice ,amount ,date } = formValues;

    const handleSubmit = (e) => {}
    const handleInputChange = (e) => {
        console.log( e.target.value );
    }
    
    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            className='modal modal__normal'
            ariaHideApp={false}
        >
            <form className='form__modal' onSubmit={ handleSubmit }>
                <legend> Editar el detalle de la venta </legend>
                
                <label htmlFor='idSale'>ID de la venta: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='ID de la venta'
                    name='idSale'
                    value={ idSale }
                    onChange={ handleInputChange }
                />

                <label htmlFor='idProduct'>ID del Producto: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='ID del Producto'
                    name='idProduct'
                    value={ idProduct }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='amountProduct'>Cantidad: </label>
                <input 
                    type='number' 
                    className='form-control' 
                    placeholder='Cantidad de productos'
                    name='amountProduct'
                    value={ amountProduct }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='purchasePrice'>Precio unitario: </label>
                <input 
                    type='number' 
                    className='form-control' 
                    placeholder='Precio unitario'
                    name='purchasePrice'
                    value={ purchasePrice }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='amount'>Total: </label>
                <input 
                    type='number' 
                    className='form-control' 
                    placeholder='Ingrese el total'
                    name='amount'
                    value={ amount }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='date'>Fecha: </label>
                <input 
                    type='date' 
                    className='form-control' 
                    placeholder='Fecha'
                    name='date'
                    value={ date }
                    onChange={ handleInputChange }
                />
                        
                <input 
                    type='submit' 
                    className='btn-primary btn__edit modal-btn' 
                    value='Editar detalle de la venta'
                />
            </form>
        </Modal>
    );
}

SalesDetailModal.prototype = {
    handleResetSearchInput: Proptypes.func.isRequired
}