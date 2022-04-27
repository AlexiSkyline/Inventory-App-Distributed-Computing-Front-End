import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import Proptypes from 'prop-types';

import { SellerContext } from '../../Context/Seller/SellerContext';
import { ModalContext } from '../../Context/Modal/ModalContext';

export const SellerModal = ({ handleResetSearchInput }) => {
    const sellerContext = useContext( SellerContext );
    const { statusEditModeSeller, infSellerEdit, createSeller, 
                updateSeller, disactiveSellerSearchMode  } = sellerContext;

    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;
    
    const [ formValues, setFormValues ] = useState({});
    const { name, lastName, rfc, address, email, phoneNumber, userName, password } = formValues;
    
    const handleInputChange = () => {}
    const handleSubmit = () => {}

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