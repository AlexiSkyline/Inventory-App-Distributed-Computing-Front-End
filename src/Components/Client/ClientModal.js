import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Proptypes from 'prop-types';

import { ClientContext } from '../../Context/Client/ClientContext';
import { ModalContext } from '../../Context/Modal/ModalContext';

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
    const { clientModeEdit, clientEdit, createClient, 
                updateClient, disactiveClientSearchMode } = clientContext;
    
    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    // * State para almacenar la informacion del Cliente a crear o actualizar
    const [ formValues, setFormValues ] = useState( initEvent );
    const { name, lastName, rfc, address, email, phoneNumber } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Caso 1: Le pasa los valores del Cliente a editar
        * Caso 2: Le pasa los el objeto initEvent para crear un Cliente
    */
    useEffect(() => {
        if( clientModeEdit ) {
            setFormValues( clientEdit );
        } else {
            setFormValues( initEvent );
        }
        // eslint-disable-next-line
    }, [ clientModeEdit, setFormValues ]);

    // * Funcion para obtener los valores del formulario
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    };

    /*
        * funcion para reiniciar el input de busqueda 
    */
    function handleResetInput() {
        setFormValues( initEvent );
    }

    /*
        * Funcion para crear o actualizar un cliente 
        * Caso 1: Crear un cliente
        * Caso 2: Actualizar un cliente
        * Luego Desactivamos el modo de busqueda si esta activo
        * Luego reiniciamos el input de busqueda
    */
    const handleOnSubmit = ( e ) => {
        e.preventDefault();
        setFormValues( initEvent );
        if( !clientModeEdit ) {
            createClient( formValues );
        } else {
            updateClient( formValues );
        }
        setFormValues( initEvent );
        uiCloseModal();
        handleResetInput();
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
            <form className='form__modal' onSubmit={ handleOnSubmit }>
                <legend>{ clientModeEdit ? 'Editar Cliente': 'Agregar Cliente' }</legend>
                
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
                    type='number' 
                    className='form-control' 
                    placeholder='Ingrese el el numero de telefono del cliente'
                    name='phoneNumber'
                    value={ phoneNumber }
                    onChange={ handleInputChange }
                />
                        
                <input 
                    type='submit' 
                    className='btn-primary btn__edit modal-btn' 
                    value={ clientModeEdit ? 'Editar cliente': 'Agregar cliente' }
                />
            </form>
        </Modal>
    );
}

ClientModal.prototype = {
    handleResetSearchInput: Proptypes.func.isRequired
}