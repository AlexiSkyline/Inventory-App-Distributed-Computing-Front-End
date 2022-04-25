import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Proptypes from 'prop-types';

import { ClientContext } from '../../Context/Client/ClientContext';
import { ModalContext } from '../../Context/Modal/ModalContext';
import { useValidation } from '../../Hooks/useValidation';
import { ValidateClient } from '../../validations/ValidateClient';
import { AlertContext } from '../../Context/Alert/AlertContext';
import { ModeEditContext } from '../../Context/ModeEdit/ModeEditContext';

// * Cuerpo inicial de nuestro inputs de agregar o editar cliente
const initEvent = {
    name: '',
    lastName: '',
    rfc: '',
    address: '',
    email: '',
    phoneNumber: ''
}

export const ClientModal = ({ handleResetSearchInput }) => {
    const clientContext = useContext( ClientContext );
    const { statusEditModeClient, infClientEdit, createClient, 
                updateClient, disactiveClientSearchMode } = clientContext;
    
    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    const modeEditContext = useContext( ModeEditContext );
    const { activeModeEdit, desactiveModeEdit } = modeEditContext;

    const { formValues, errors, handleSubmit, handleInputChange, isValid, handleResetInput } = useValidation( initEvent, ValidateClient, infClientEdit );
    const { name, lastName, rfc, address, email, phoneNumber } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Caso 1: Le pasa los valores del Cliente a editar
        * Caso 2: Le pasa los el objeto initEvent para crear un Cliente
    */
    useEffect(() => {
        if( statusEditModeClient ) {
            activeModeEdit( infClientEdit );
        } else {
            desactiveModeEdit();
        }
        // eslint-disable-next-line
    }, [ statusEditModeClient, activeModeEdit ]);

    /*
        * Funcion para crear o actualizar un cliente 
        * Caso 1: Crear un cliente
        * Caso 2: Actualizar un cliente
        * Luego Desactivamos el modo de busqueda si esta activo
        * Luego reiniciamos el input de busqueda
    */
    function handleOnSubmit( e ) {
        e.preventDefault();
        handleSubmit(e);
        if( isValid ) {
            if( !statusEditModeClient ) {
                createClient( formValues );
            } else {
                updateClient( formValues );
            }
            uiCloseModal();
            handleResetInput();
            disactiveClientSearchMode();
            handleResetSearchInput();
        }
    }

    useEffect(() => {
        if( Object.values(errors)[0] ) {
            showAlert( Object.values(errors)[0], 'alert-error' );
        }
    }, [errors]);

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            className='modal modal__big'
            ariaHideApp={false}
        >
            <form className='form__modal' onSubmit={ handleOnSubmit }>
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
                
                <label htmlFor='address'>Dirección: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Ingrese la dirección del Cliente'
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