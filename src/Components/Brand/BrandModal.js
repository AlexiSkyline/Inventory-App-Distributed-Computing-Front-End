import React, { useContext, useEffect } from 'react';
import Modal from 'react-modal';
import Proptypes from 'prop-types';

import { BrandContext } from '../../Context/Brand/BrandContext';
import { ModalContext } from '../../Context/Modal/ModalContext';
import { ModeEditContext } from '../../Context/ModeEdit/ModeEditContext';

import { useValidation } from '../../Hooks/useValidation';
import { ValidateBrand } from '../../validations/ValidateBrand';
import { initialFormValuesBrand } from '../../Data/InitialFormValues';

export const BrandModal = ({ handleResetSearchInput }) => {
    const brandContext = useContext( BrandContext );
    const { brandModeEdit, brandEdit, createBrand, updateBrand, modeSearchBrandDesactive, desactiveModeEditBrand } = brandContext;

    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const modeEditContext = useContext( ModeEditContext );
    const { activeModeEdit, desactiveModeEdit } = modeEditContext;
    
    const [ formValues, handleSubmit, handleInputChange ] = useValidation( initialFormValuesBrand, ValidateBrand, handleCreateAndUpdate );
    const { description } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Si el modo de edicion esta activo, le pasamos los valores para actualizar
        * Si no esta activo, le pasamos los valores vacios para crear
    */
    useEffect(() => {
        if( brandModeEdit ) {
            activeModeEdit( brandEdit );
        } else {
            desactiveModeEdit();
        }
        // eslint-disable-next-line
    }, [ brandModeEdit ]);

    /*
        * Funcion para crear o actualizar una marca 
        * Si el modo de edicion es falsa, se crea una nueva marca
        * Si el modo edicion es verdadera, se actualiza la marca
        * 1: Desactivamos el modo de busqueda si esta activo
        * 2: Desactivamos el modo de edicion de marca
        * 3: Cerramos el modal
        * 4: Reiniciamos el input de busqueda
        * 5: Eliminamos el texto de input de busqueda si hay alguno
    */
    function handleCreateAndUpdate() {
        if( !brandModeEdit ) {
            createBrand( formValues );
        } else {
            updateBrand( formValues );
        }
        desactiveModeEdit();
        desactiveModeEditBrand();
        uiCloseModal();
        modeSearchBrandDesactive();
        handleResetSearchInput();
    }

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            className='modal modal__brand'
            ariaHideApp={false}
        >
            <form className='form__modal' onSubmit={ handleSubmit }>
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
                    value={ brandModeEdit ? 'Editar marca': 'Agregar marca' }
                />
            </form>
        </Modal>
    );
}

BrandModal.propTypes = {
    handleResetSearchInput: Proptypes.func.isRequired
}