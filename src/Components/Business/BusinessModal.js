import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal';
import Proptypes from 'prop-types';

import { ModalContext } from '../../Context/Modal/ModalContext';
import { BusinessContext } from '../../Context/Business/BusinessContext';
import { ModeEditContext } from '../../Context/ModeEdit/ModeEditContext';

import { useValidation } from '../../Hooks/useValidation';
import { initialFormValuesBusiness } from '../../Data/InitialFormValues';
import { ValidateBusiness } from '../../validations/ValidateBusiness';

export const BusinessModal = ({ handleResetSearchInput }) => {
    const businessContext = useContext( BusinessContext );
    const { businessModeEdit, businessEdit, createBusiness, 
                updateBusiness, modeSearchBusinessDesactive } = businessContext;

    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const modeEditContext = useContext( ModeEditContext );
    const { activeModeEdit, desactiveModeEdit } = modeEditContext;

    const { formValues, handleSubmit, handleInputChange } = useValidation( initialFormValuesBusiness, ValidateBusiness, handleCreateAndUpdate );
    const { name, address } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Caso 1: Le pasa los valores de la empresa a editar
        * Caso 2: Le pasa los el objeto initEvent para crear una nueva empresa
    */
    useEffect(() => {
        if( businessModeEdit ) {
            activeModeEdit( businessEdit );
        } else {
            desactiveModeEdit();
        }
        // eslint-disable-next-line
    }, [ businessModeEdit, activeModeEdit ]);

    /*
        * Funcion para crear o actualizar una empresa 
        * Caso 1: Crear una empresa
        * Caso 2: Actualizar una empresa
        * Luego Desactivamos el modo de busqueda si esta activo
        * Luego reiniciamos el input de busqueda
    */
    function handleCreateAndUpdate() {
        if( !businessModeEdit ) {
            createBusiness( formValues );
        } else {
            updateBusiness( formValues );
        }
        uiCloseModal();
        modeSearchBusinessDesactive();
        handleResetSearchInput();
    }

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            className='modal modal_medium'
            ariaHideApp={false}
        >
            <form className='form__modal' onSubmit={ handleSubmit }>
                <legend>{ businessModeEdit ? 'Editar empresa': 'Agregar empresa' }</legend>
                
                <label htmlFor='name'>Nombre: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Ingrese el nombre de la empresa'
                    name='name'
                    value={ name }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='address'>Dirección: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Ingrese la dirección de la empresa'
                    name='address'
                    value={ address }
                    onChange={ handleInputChange }
                />
                        
                <input 
                    type='submit' 
                    className='btn-primary btn__edit modal-btn' 
                    value={ businessModeEdit ? 'Editar empresa': 'Agregar empresa' }
                />
            </form>
        </Modal>
    );
}

BusinessModal.prototype = {
    handleResetSearchInput: Proptypes.func.isRequired
}