import React, { useContext, useEffect } from 'react';
import Proptypes from 'prop-types';
import Modal from 'react-modal';

import { ModalContext } from '../../Context/Modal/ModalContext';
import { SalesDetailContext } from '../../Context/SalesDetail/SalesDetailContext';
import { useValidation } from '../../Hooks/useValidation';
import { ValidateSalesDetail } from '../../validations/ValidateSalesDetail';
import { initialFormValuesSalesDetail } from '../../Data/InitialFormValues';
import { ModeEditContext } from '../../Context/ModeEdit/ModeEditContext';
import { SelectProduct } from '../UI/Select/SelectProduct';
import { SelectSales } from '../UI/Select/SelectSales';

export const SalesDetailModal = ({ handleResetSearchInput }) => {
    const salesDetailContext = useContext( SalesDetailContext );
    const { statusEditModeSalesDetail, infSalesDetailEdit, updateSalesDetail, 
                disactiveSalesDetailSearchMode, desactiveModeEditSalesDetail } = salesDetailContext;

    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const modeEditContext = useContext( ModeEditContext );
    const { activeModeEdit, desactiveModeEdit } = modeEditContext;

    const [ formValues, handleSubmit, handleInputChange ] = useValidation( initialFormValuesSalesDetail, 
                                                                        ValidateSalesDetail, handleUpdate );
    const { idSale ,idProduct ,amountProduct ,purchasePrice ,amount } = formValues;
    
    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Si el modo de edicion esta activo, le pasamos los valores para actualizar
        * Si no esta activo, le pasamos los valores vacios para crear
    */
    useEffect(() => {
        if( statusEditModeSalesDetail ) {
            activeModeEdit( infSalesDetailEdit );
        } else {
            desactiveModeEdit();
        }
        // eslint-disable-next-line
    }, [ statusEditModeSalesDetail ]);

    /*
        * Funcion para actualizar el detalle de una venta
        * 1: Cerramos el modal
        * 2: Desactivamos el modo de busqueda si esta activo
        * 3: Reiniciamos el input de busqueda
        * 4: Desactivamos el modo de edicion General
        * 5: Desactivamos el modo de edicion de Venta
    */
    function handleUpdate() {
        updateSalesDetail( formValues );
        uiCloseModal();
        disactiveSalesDetailSearchMode();
        handleResetSearchInput();
        desactiveModeEdit();
        desactiveModeEditSalesDetail();
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
                <SelectSales value={ idSale } onChange={ handleInputChange }/>

                <label htmlFor='idProduct'>Producto: </label>
                <SelectProduct value={ idProduct } onChange={ handleInputChange }/>
                
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