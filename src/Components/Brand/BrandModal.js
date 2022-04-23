import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { BrandContext } from '../../Context/Brand/BrandContext';
import { ModalContext } from '../../Context/Modal/ModalContext';

// * Cuerpo inicial de nuestro inputs de agregar o editar marca
const initEvent = {
    description: ''
}

export const BrandModal = ({ handleResetInput }) => {
    const brandContext = useContext( BrandContext );
    const { brandModeEdit, brandEdit, createBrand } = brandContext;

    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;
    
    // * State para almacenar la informacion del producto a crear o actualizar
    const [ formValues, setFormValues ] = useState( initEvent );
    const { description } = formValues;

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

    const handleOnSubmit = ( e ) => {
        e.preventDefault();
        createBrand( formValues );
        uiCloseModal();
        handleResetInput();
    }

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            className='modal modal__brand'
            ariaHideApp={false}
        >
            <form className='form__modal' onSubmit={ handleOnSubmit }>
                <legend>{ brandModeEdit ? 'Editar Marca': 'Agregar Marca' }</legend>
                
                <label htmlFor='description'>Descripción: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Ingrese la descripción de la marca'
                    name='description'
                    value={ description }
                    onChange={ handleInputChange }
                />
                        
                <input 
                    type='submit' 
                    className='btn-primary btn__edit modal-btn' 
                    value={ brandModeEdit ? 'Editar Producto': 'Agregar producto' }
                />
            </form>
        </Modal>
    );
}