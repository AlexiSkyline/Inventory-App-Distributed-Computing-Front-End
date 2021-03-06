import React, { useContext, useEffect } from 'react';
import Modal from 'react-modal';
import Proptypes from 'prop-types';

import { ClientContext } from '../../Context/Client/ClientContext';
import { ModalContext } from '../../Context/Modal/ModalContext';
import { useValidation } from '../../Hooks/useValidation';
import { ValidateClient } from '../../validations/ValidateClient';
import { ModeEditContext } from '../../Context/ModeEdit/ModeEditContext';
import { initialFormValuesClient } from '../../Data/InitialFormValues';

export const ClientModal = ({ handleResetSearchInput }) => {
    const clientContext = useContext( ClientContext );
    const { statusEditModeClient, infClientEdit, createClient, 
                updateClient, disactiveClientSearchMode, desactiveModeEditClient } = clientContext;
    
    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const modeEditContext = useContext( ModeEditContext );
    const { activeModeEdit, desactiveModeEdit } = modeEditContext;

    const [ formValues, handleSubmit, handleInputChange ] = useValidation( initialFormValuesClient, ValidateClient, handleCreateAndUpdate );
    const { name, lastName, rfc, address, email, phoneNumber } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Si el modo de edicion esta activo, le pasamos los valores para actualizar
        * Si no esta activo, le pasamos los valores vacios para crear
    */
    useEffect(() => {
        if( statusEditModeClient ) {
            activeModeEdit( infClientEdit );
        } else {
            desactiveModeEdit();
        }
        // eslint-disable-next-line
    }, [ statusEditModeClient ]);

    /*
        * Funcion para crear o actualizar un cliente 
        * Si el modo de edicion esta activo, actualizamos el cliente
        * Si no esta activo, creamos el cliente
        * 1: Desactivamos el modo de busqueda si esta activo
        * 2: Desactivamos el modo de edicion de cliente
        * 3: Cerramos el modal
        * 4: Reiniciamos el input de busqueda
    */
    function handleCreateAndUpdate() {
        if( !statusEditModeClient ) {
            createClient( formValues );
        } else {
            updateClient( formValues );
        }
        desactiveModeEdit();
        desactiveModeEditClient();
        uiCloseModal();
        disactiveClientSearchMode();
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
                <legend>{ statusEditModeClient ? 'Editar Cliente': 'Agregar Cliente' }</legend>
                
                <label htmlFor='name'>Nombre: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Nombre del Cliente'
                    name='name'
                    value={ name }
                    onChange={ handleInputChange }
                />

                <label htmlFor='lastName'>Apellidos: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Apellidos del Cliente'
                    name='lastName'
                    value={ lastName }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='rfc'>RFC: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='RFC del Cliente'
                    name='rfc'
                    value={ rfc }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='address'>Direcci??n: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Ingrese la direcci??n del Cliente'
                    name='address'
                    value={ address }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='email'>Email: </label>
                <input 
                    type='email' 
                    className='form-control' 
                    placeholder='Ingrese el correo del cliente'
                    name='email'
                    value={ email }
                    onChange={ handleInputChange }
                />

                <label htmlFor='phoneNumber'>Numero de Telefono: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Ingrese el el numero de telefono del cliente'
                    name='phoneNumber'
                    value={ phoneNumber }
                    onChange={ handleInputChange }
                />
                        
                <input 
                    type='submit' 
                    className='btn-primary btn__edit modal-btn' 
                    value={ statusEditModeClient ? 'Editar cliente': 'Agregar cliente' }
                />
            </form>
        </Modal>
    );
}

ClientModal.prototype = {
    handleResetSearchInput: Proptypes.func.isRequired
}