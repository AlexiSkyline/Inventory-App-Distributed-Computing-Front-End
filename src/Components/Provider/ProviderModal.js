import React, { useContext, useEffect } from 'react';
import Modal from 'react-modal';
import Proptypes from 'prop-types';

import { ModalContext } from '../../Context/Modal/ModalContext';
import { ProviderContext } from '../../Context/Provider/ProviderContext';
import { ModeEditContext } from '../../Context/ModeEdit/ModeEditContext';

import { initialFormValuesProvider } from '../../Data/InitialFormValues';
import { ValidateProvider } from '../../validations/ValidateProvider';
import { useValidation } from '../../Hooks/useValidation';

export const ProviderModal = ({ handleResetSearchInput }) => {
    const providerContext = useContext( ProviderContext );
    const { statusEditModeProvider, infProviderEdit, createProvider, updateProvider,
            disactiveProviderSearchMode } = providerContext;
    
    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const modeEditContext = useContext( ModeEditContext );
    const { activeModeEdit, desactiveModeEdit } = modeEditContext;

    const { formValues, handleSubmit, handleInputChange } = useValidation( initialFormValuesProvider, ValidateProvider, handleCreateAndUpdate );
    const { name, lastName, rfc, address, email, phoneNumber } = formValues;
    
    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Caso 1: Le pasa los valores del proveedor a editar
        * Caso 2: Le pasa los el objeto initEvent para crear un proveedor
    */
    useEffect(() => {
        if( statusEditModeProvider ) {
            activeModeEdit( infProviderEdit );
        } else {
            desactiveModeEdit();
        }
        // eslint-disable-next-line
    }, [ statusEditModeProvider, activeModeEdit ]);
    
    /*
        * Funcion para crear o actualizar un proveedor 
        * Caso 1: Crear un proveedor
        * Caso 2: Actualizar un proveedor
        * Luego Desactivamos el modo de busqueda si esta activo
        * Luego reiniciamos el input de busqueda
    */
    function handleCreateAndUpdate() {
        if( !statusEditModeProvider ) {
            createProvider( formValues );
        } 
        uiCloseModal();
        disactiveProviderSearchMode();
        handleResetSearchInput();
    }

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            className='modal modal__big'
            ariaHideApp={false}
        >
            <form className='form__modal' onSubmit={ handleSubmit }>
                <legend>{ statusEditModeProvider ? 'Editar proveedor': 'Agregar proveedor' }</legend>
                
                <label htmlFor='name'>Nombre: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Nombre del proveedor'
                    name='name'
                    value={ name }
                    onChange={ handleInputChange }
                />

                <label htmlFor='lastName'>Apellidos: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Apellidos del proveedor'
                    name='lastName'
                    value={ lastName }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='rfc'>RFC: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='RFC del proveedor'
                    name='rfc'
                    value={ rfc }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='address'>Dirección: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Ingrese la dirección del proveedor'
                    name='address'
                    value={ address }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='email'>Email: </label>
                <input 
                    type='email' 
                    className='form-control' 
                    placeholder='Ingrese el correo del proveedor'
                    name='email'
                    value={ email }
                    onChange={ handleInputChange }
                />

                <label htmlFor='phoneNumber'>Numero de Telefono: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Ingrese el el numero de telefono del proveedor'
                    name='phoneNumber'
                    value={ phoneNumber }
                    onChange={ handleInputChange }
                />
                        
                <input 
                    type='submit' 
                    className='btn-primary btn__edit modal-btn' 
                    value={ statusEditModeProvider ? 'Editar proveedor': 'Agregar proveedor' }
                />
            </form>
        </Modal>
    );
}

ProviderModal.prototype = {
    handleResetSearchInput: Proptypes.func.isRequired
}