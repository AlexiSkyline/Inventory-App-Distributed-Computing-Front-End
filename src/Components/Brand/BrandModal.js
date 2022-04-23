import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { BrandContext } from '../../Context/Brand/BrandContext';
import { ModalContext } from '../../Context/Modal/ModalContext';

// * Cuerpo inicial de nuestro inputs de agregar o editar marca
const initEvent = {
    description: ''
}

export const BrandModal = ({ handleResetInput }) => {
    const brandContext = useContext( BrandContext );
    const { brandModeEdit, brandEdit, createBrand, updateBrand } = brandContext;

    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;
    
    // * State para almacenar la informacion de la marca a crear o actualizar
    const [ formValues, setFormValues ] = useState( initEvent );
    const { description } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Caso 1: Le pasa los valores de la marca a editar
        * Caso 2: Le pasa los el objeto initEvent para crear una nuva marca
    */
    useEffect(() => {
        if( brandModeEdit ) {
            setFormValues( brandEdit );
        } else {
            setFormValues( initEvent );
        }
        // eslint-disable-next-line
    }, [ brandModeEdit, setFormValues ]);

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
        * Funcion para crear o actualizar una marca 
        * Caso 1: Crear una marca
        * Caso 2: Actualizar una marca
        * Luego Desactivamos el modo de busqueda si esta activo
        * Luego reiniciamos el input de busqueda
    */
    const handleOnSubmit = ( e ) => {
        e.preventDefault();
        if( !brandModeEdit ) {
            createBrand( formValues );
            setFormValues( initEvent );
        } else {
            updateBrand( formValues );
            setFormValues( initEvent );
        }
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