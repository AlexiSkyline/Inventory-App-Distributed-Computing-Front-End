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
    const { statusEditModeSeller, infSellerEdit, createSeller, 
                updateSeller, disactiveSellerSearchMode, desactiveModeEditSeller } = sellerContext;

    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const modeEditContext = useContext( ModeEditContext );
    const { activeModeEdit, desactiveModeEdit } = modeEditContext;
    
    const [ formValues, handleSubmit, handleInputChange ] = useValidation( initialFormValuesSeller, ValidateSeller, handleCreateAndUpdate );
    const { name, lastName, rfc, address, email, phoneNumber, userName, password } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Si el modo de edicion esta activo, le pasamos los valores para actualizar
        * Si no esta activo, le pasamos los valores vacios para crear
    */
    useEffect(() => {
        if( statusEditModeSeller ) {
            activeModeEdit( infSellerEdit );
        } else {
            desactiveModeEdit();
        }
        // eslint-disable-next-line
    }, [ statusEditModeSeller ]);

    /*
        * Funcion para crear o actualizar un vendedor 
        * Si el modo de edicion esta activo, actualizamos el vendedor
        * Si no esta activo, creamos el vendedor
        * 1: Desactivamos el modo edicion de General
        * 2: Desactivamos el modo edicion de vendedor
        * 3: Cerramos el modal
        * 4: Desactivamos el modo de busqueda si esta activo
        * 5: Reiniciamos el input de busqueda
    */
    function handleCreateAndUpdate() {
        if( !statusEditModeSeller ) {
            createSeller( formValues );
        } else {
            updateSeller( formValues );
        }
        desactiveModeEdit();
        desactiveModeEditSeller();
        uiCloseModal();
        disactiveSellerSearchMode();
        handleResetSearchInput();
    }

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            className='modal modal__seller'
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
                
                <label htmlFor='address'>Direcci??n: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Ingrese la direcci??n del Vendedor'
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
                
                <label htmlFor='password'>Contrase??a: </label>
                <input 
                    type='password' 
                    className='form-control' 
                    placeholder='Ingrese la contrase??a del Vendedor'
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