import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal';
import Proptypes from 'prop-types';

import { ModalContext } from '../../Context/Modal/ModalContext';
import { BusinessContext } from '../../Context/Business/BusinessContext';

// * Cuerpo inicial de nuestro inputs de agregar o editar empresa
const initEvent = {
    name: '',
    address: '',
}

export const BusinessModal = ({ handleResetSearchInput }) => {
    const businessContext = useContext( BusinessContext );
    const { businessModeEdit, businessEdit, createBusiness, updateBusiness } = businessContext;
    
    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    // * State para almacenar la informacion de la empresa a crear o actualizar
    const [ formValues, setFormValues ] = useState( initEvent );
    const { name, address } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Caso 1: Le pasa los valores de la empresa a editar
        * Caso 2: Le pasa los el objeto initEvent para crear una nueva empresa
    */
    useEffect(() => {
        if( businessModeEdit ) {
            setFormValues( businessEdit );
        } else {
            setFormValues( initEvent );
        }
        // eslint-disable-next-line
    }, [ businessModeEdit, setFormValues ]);

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
        * Funcion para crear o actualizar una empresa 
        * Caso 1: Crear una empresa
        * Caso 2: Actualizar una empresa
        * Luego Desactivamos el modo de busqueda si esta activo
        * Luego reiniciamos el input de busqueda
    */
    const handleOnSubmit = ( e ) => {
        e.preventDefault();
        setFormValues( initEvent );
        if( !businessModeEdit ) {
            createBusiness( formValues );
        } else {
            updateBusiness( formValues );
        }
        setFormValues( initEvent );
        uiCloseModal();
        handleResetInput();
        handleResetSearchInput();
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