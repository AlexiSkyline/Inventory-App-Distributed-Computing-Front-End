import React, { useContext, useEffect } from 'react'
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
                updateBusiness, modeSearchBusinessDesactive, desactiveModeEditBusiness } = businessContext;

    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const modeEditContext = useContext( ModeEditContext );
    const { activeModeEdit, desactiveModeEdit } = modeEditContext;

    const [ formValues, handleSubmit, handleInputChange ] = useValidation( initialFormValuesBusiness, ValidateBusiness, handleCreateAndUpdate );
    const { name, address } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Si el modo de edicion esta activo, le pasamos los valores para actualizar
        * Si no esta activo, le pasamos los valores vacios para crear
    */
    useEffect(() => {
        if( businessModeEdit ) {
            activeModeEdit( businessEdit );
        } else {
            desactiveModeEdit();
        }
        // eslint-disable-next-line
    }, [ businessModeEdit ]);

    /*
        * Funcion para crear o actualizar una empresa 
        * Si el modo de edicion es falsa, se crea una nueva empresa
        * Si el modo edicion es verdadera, se actualiza la empresa
        * 1: Desactivamos el modo de busqueda si esta activo
        * 2: Desactivamos el modo de edicion de empresa
        * 3: Cerramos el modal
        * 4: Reiniciamos el input de busqueda si hay alguno
    */
    function handleCreateAndUpdate() {
        if( !businessModeEdit ) {
            createBusiness( formValues );
        } else {
            updateBusiness( formValues );
        }
        desactiveModeEdit();
        desactiveModeEditBusiness();
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