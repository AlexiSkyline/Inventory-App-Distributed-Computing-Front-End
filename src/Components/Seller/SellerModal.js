import React, { useContext, useEffect } from 'react';
import Modal from 'react-modal';
import Proptypes from 'prop-types';
import { useValidation } from '../../Hooks/useValidation';

import { SellerContext } from '../../Context/Seller/SellerContext';
import { ModalContext } from '../../Context/Modal/ModalContext';
import { ModeEditContext } from '../../Context/ModeEdit/ModeEditContext';

import { initialFormValuesSeller } from '../../Data/InitialFormValues';
import { ValidateSeller } from '../../validations/ValidateSeller';

export const SellerModal = ({ handleResetSearchInput }) => {
    const sellerContext = useContext( SellerContext );
    const { getSellers, statusEditModeSeller, infSellerEdit, createSeller, 
                updateSeller, disactiveSellerSearchMode  } = sellerContext;

    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const modeEditContext = useContext( ModeEditContext );
    const { activeModeEdit, desactiveModeEdit } = modeEditContext;
    
    const [ formValues, handleSubmit, handleInputChange ] = useValidation( initialFormValuesSeller, ValidateSeller, handleCreateAndUpdate );
    const { name, lastName, rfc, address, email, phoneNumber, userName, password } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Caso 1: Le pasa los valores del Vendedor a editar
        * Caso 2: Le pasa los el objeto initEvent para crear un Vendedor
    */
    useEffect(() => {
        if( statusEditModeSeller ) {
            activeModeEdit( infSellerEdit );
        } else {
            desactiveModeEdit();
        }
    }, [ statusEditModeSeller, activeModeEdit, desactiveModeEdit, infSellerEdit ]);

    /*
        * Funcion para crear o actualizar un vendedor 
        * Caso 1: Crear un vendedor
        * Caso 2: Actualizar un vendedor
        * Luego Desactivamos el modo de busqueda si esta activo
        * Luego reiniciamos el input de busqueda
    */
    function handleCreateAndUpdate() {
        if( !statusEditModeSeller ) {
            createSeller( formValues );
        } else {
            updateSeller( formValues );
        }
        getSellers();
        uiCloseModal();
        disactiveSellerSearchMode();
        handleResetSearchInput();
    }

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            className='modal'
            ariaHideApp={false}
        >
            <form className='form__modal' onSubmit={ handleSubmit }>
                <legend>{ statusEditModeSeller ? 'Editar Vendedor': 'Agregar Vendedor' }</legend>
                
                <label htmlFor='name'>Nombre: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Nombre del Vendedor'
                    name='name'
                    value={ name }
                    onChange={ handleInputChange }
                />

                <label htmlFor='lastName'>Apellidos: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Apellidos del Vendedor'
                    name='lastName'
                    value={ lastName }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='rfc'>RFC: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='RFC del Vendedor'
                    name='rfc'
                    value={ rfc }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='address'>Dirección: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Ingrese la dirección del Vendedor'
                    name='address'
                    value={ address }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='email'>Email: </label>
                <input 
                    type='email' 
                    className='form-control' 
                    placeholder='Ingrese el correo del Vendedor'
                    name='email'
                    value={ email }
                    onChange={ handleInputChange }
                />

                <label htmlFor='phoneNumber'>Numero de Telefono: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Ingrese el el numero de telefono del Vendedor'
                    name='phoneNumber'
                    value={ phoneNumber }
                    onChange={ handleInputChange }
                />

                <label htmlFor='userName'>Nombre de Usuario: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Ingrese el nombre de usuario del Vendedor'
                    name='userName'
                    value={ userName }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='password'>Contraseña: </label>
                <input 
                    type='password' 
                    className='form-control' 
                    placeholder='Ingrese la contraseña del Vendedor'
                    name='password'
                    value={ password }
                    onChange={ handleInputChange }
                />
                        
                <input 
                    type='submit' 
                    className='btn-primary btn__edit modal-btn' 
                    value={ statusEditModeSeller ? 'Editar Vendedor': 'Agregar Vendedor' }
                />
            </form>
        </Modal>
    );
}

SellerModal.prototype = {
    handleResetSearchInput: Proptypes.func.isRequired
}