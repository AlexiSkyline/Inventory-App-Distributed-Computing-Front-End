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
    const { brandModeEdit, brandEdit, createBrand, updateBrand, modeSearchBrandDesactive } = brandContext;

    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const modeEditContext = useContext( ModeEditContext );
    const { activeModeEdit, desactiveModeEdit } = modeEditContext;
    
    const { formValues, handleSubmit, handleInputChange, isValid } = useValidation( initialFormValuesBrand, ValidateBrand );
    const { description } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Caso 1: Le pasa los valores de la marca a editar
        * Caso 2: Le pasa los el objeto initEvent para crear una nuva marca
    */
    useEffect(() => {
        if( brandModeEdit ) {
            activeModeEdit( brandEdit );
        } else {
            desactiveModeEdit();
        }
        // eslint-disable-next-line
    }, [ brandModeEdit, activeModeEdit ]);

    /*
        * Funcion para crear o actualizar una marca 
        * Caso 1: Crear una marca
        * Caso 2: Actualizar una marca
        * Luego Desactivamos el modo de busqueda si esta activo
        * Luego reiniciamos el input de busqueda
    */
    const handleOnSubmit = ( e ) => {
        e.preventDefault();
        handleSubmit(e);
        if( isValid ) {
            if( !brandModeEdit ) {
                createBrand( formValues );
            } else {
                updateBrand( formValues );
            }
            uiCloseModal();
            modeSearchBrandDesactive();
            handleResetSearchInput();
        }
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
                    value={ brandModeEdit ? 'Editar marca': 'Agregar marca' }
                />
            </form>
        </Modal>
    );
}

BrandModal.propTypes = {
    handleResetSearchInput: Proptypes.func.isRequired
}