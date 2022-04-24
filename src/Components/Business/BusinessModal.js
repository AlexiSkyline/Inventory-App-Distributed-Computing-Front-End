import React, { useContext, useState } from 'react'
import Modal from 'react-modal';
import Proptypes from 'prop-types';

import { ModalContext } from '../../Context/Modal/ModalContext';
import { BusinessContext } from '../../Context/Business/BusinessContext';

// * Cuerpo inicial de nuestro inputs de agregar o editar unidad de medida
const initEvent = {
    name: '',
    address: '',
}

export const BusinessModal = ({ handleResetSearchInput }) => {
    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const businessContext = useContext( BusinessContext );
    const { businessModeEdit } = businessContext;

    // * State para almacenar la informacion de la unidad de medida a crear o actualizar
    const [ formValues, setFormValues ] = useState( initEvent );
    const { name, address } = formValues;

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
        * Funcion para crear o actualizar una unidad de medida 
        * Caso 1: Crear una unidad de medida
        * Caso 2: Actualizar una unidad de medida
        * Luego Desactivamos el modo de busqueda si esta activo
        * Luego reiniciamos el input de busqueda
    */
    const handleOnSubmit = ( e ) => {

    }

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            className='modal modal_medium'
            ariaHideApp={false}
        >
            <form className='form__modal' onSubmit={ handleOnSubmit }>
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