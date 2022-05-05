import React, { useContext, useEffect } from 'react';
import Proptypes from 'prop-types';
import Modal from 'react-modal';

import { SalesContext } from '../../Context/Sales/SalesContext';
import { ModalContext } from '../../Context/Modal/ModalContext';
import { ModeEditContext } from '../../Context/ModeEdit/ModeEditContext';

import { SelectSeller } from '../UI/Select/SelectSeller';
import { SelectClient } from '../UI/Select/SelectClient';
import { SelectBusiness } from '../UI/Select/SelectBusiness';

import { initialFormValuesSale } from '../../Data/InitialFormValues';
import { useValidation } from '../../Hooks/useValidation';
import { ValidateSales } from '../../validations/ValidateSale';
import { SelectPaymentType } from '../UI/Select/SelectPaymentType';

export const SalesModal = ({ handleResetSearchInput }) => {
    const salesContext = useContext( SalesContext );
    const { statusEditModeSales, infSalesEdit, updateSales, 
                desactiveModeEditSales, disactiveSalesSearchMode } = salesContext;

    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const modeEditContext = useContext( ModeEditContext );
    const { activeModeEdit, desactiveModeEdit } = modeEditContext;
    
    const [ formValues, handleSubmit, handleInputChange ] = useValidation( initialFormValuesSale, ValidateSales, handleUpdate );
    const { idSeller, idClient, idBusiness, folio, total, iva, subTotal, paymentType, date } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Si el modo de edicion esta activo, le pasamos los valores para actualizar
        * Si no esta activo, le pasamos los valores vacios para crear
    */
    useEffect(() => {
        if( statusEditModeSales ) {
            activeModeEdit( infSalesEdit );
        } else {
            desactiveModeEdit();
        }
        // eslint-disable-next-line
    }, [ statusEditModeSales ]);

    /*
        * Funcion para Actualizar una venta
        * 1: Cerramos el modal
        * 2: Desactivamos el modo de busqueda si esta activo
        * 3: Reiniciamos el input de busqueda
        * 4: Desactivamos el modo de edicion de venta
    */
    function handleUpdate() {
        updateSales( formValues );
        uiCloseModal();
        disactiveSalesSearchMode();
        handleResetSearchInput();
        desactiveModeEdit();
        desactiveModeEditSales();
    }

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            className='modal modal__sales'
            ariaHideApp={false}
        >
            <form className='form__modal' onSubmit={ handleSubmit }>
                <legend> Editar venta </legend>
                
                <label htmlFor='idSeller'>Vendedor: </label>
                <SelectSeller value={ idSeller } onChange={ handleInputChange } />

                <label htmlFor='idClient'>Cliente: </label>
                <SelectClient value={ idClient } onChange={ handleInputChange } />
                
                <label htmlFor='folio'>Folio: </label>
                <input 
                    type='number' 
                    className='form-control' 
                    placeholder='Folio de la venta'
                    name='folio'
                    value={ folio }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='idBusiness'>Empresa: </label>
                <SelectBusiness value={ idBusiness } onChange={ handleInputChange } />
                
                <label htmlFor='total'>Total: </label>
                <input 
                    type='number' 
                    className='form-control' 
                    placeholder='Ingrese el total'
                    name='total'
                    value={ total }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='iva'>IVA: </label>
                <input 
                    type='number' 
                    className='form-control' 
                    placeholder='Ingrese el IVA'
                    name='iva'
                    value={ iva }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='subTotal'>SubTotal: </label>
                <input 
                    type='number' 
                    className='form-control' 
                    placeholder='Ingrese el subTotal'
                    name='subTotal'
                    value={ subTotal }
                    onChange={ handleInputChange }
                />

                <label htmlFor='paymentType'>Tipo de pago: </label>
                <SelectPaymentType value={ paymentType } onChange={ handleInputChange } />
                
                <label htmlFor='date'>Fecha: </label>
                <input 
                    type='date' 
                    className='form-control'
                    name='date'
                    value={ date }
                    onChange={ handleInputChange }
                />
                        
                <input 
                    type='submit' 
                    className='btn-primary btn__edit modal-btn' 
                    value='Guardar cambios'
                />
            </form>
        </Modal>
    );
}

SalesModal.prototype = {
    handleResetSearchInput: Proptypes.func.isRequired
}