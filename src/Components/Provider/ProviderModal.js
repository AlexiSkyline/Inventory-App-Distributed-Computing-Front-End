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
            disactiveProviderSearchMode, desactiveModeEditProviders } = providerContext;
    
    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const modeEditContext = useContext( ModeEditContext );
    const { activeModeEdit, desactiveModeEdit } = modeEditContext;

    const [ formValues, handleSubmit, handleInputChange ] = useValidation( initialFormValuesProvider, ValidateProvider, handleCreateAndUpdate );
    const { name, lastName, rfc, address, email, phoneNumber } = formValues;
    
    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Si el modo de edicion esta activo, le pasamos los valores para actualizar
        * Si no esta activo, le pasamos los valores vacios para crear
    */
    useEffect(() => {
        if( statusEditModeProvider ) {
            activeModeEdit( infProviderEdit );
        } else {
            desactiveModeEdit();
        }
        // eslint-disable-next-line
    }, [ statusEditModeProvider ]);
    
    /*
        * Funcion para crear o actualizar un proveedor 
        * Si el modo de edicion esta en false, se crea un nuevo proveedor
        * Si el modo edicion esta en true, se actualiza el proveedor
        * 1: Desactivamos el modo de busqueda si esta activo
        * 2: Desactivamos el modo de edicion de proveedor
        * 3: Cerramos el modal
        * 4: Reiniciamos el input de busqueda
    */
    function handleCreateAndUpdate() {
        if( !statusEditModeProvider ) {
            createProvider( formValues );
        } else {
            updateProvider( formValues );
        }
        desactiveModeEdit();
        desactiveModeEditProviders();
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