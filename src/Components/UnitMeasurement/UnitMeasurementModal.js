import React, { useContext, useEffect } from 'react';
import Modal from 'react-modal';
import Proptypes from 'prop-types';

import { ModalContext } from '../../Context/Modal/ModalContext';
import { UnitMeasurementContext } from '../../Context/UnitMeasurement/UnitMeasurementContext';
import { ModeEditContext } from '../../Context/ModeEdit/ModeEditContext';

import { useValidation } from '../../Hooks/useValidation';
import { initialFormValuesUnitMeasurement } from '../../Data/InitialFormValues';
import { ValidateUnitMeasurement } from '../../validations/ValidateUnitMeasurement';

export const UnitMeasurementModal = ({ handleResetSearchInput }) => {
    const unitMeasurementContext = useContext( UnitMeasurementContext );
    const { unitMsModeEdit, unitMsEdit, createUnitMs, updateUnitMs, 
                modeSearchUnitMDesactive } = unitMeasurementContext;

    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;
    
    const modeEditContext = useContext( ModeEditContext );
    const { activeModeEdit, desactiveModeEdit } = modeEditContext;

    const [ formValues, handleSubmit, handleInputChange ] = useValidation( initialFormValuesUnitMeasurement, ValidateUnitMeasurement, handleCreateAndUpdate );
    const { description } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Caso 1: Le pasa los valores de la unidad de medida a editar
        * Caso 2: Le pasa los el objeto initEvent para crear una nueva unidad de medida
    */
    useEffect(() => {
        if( unitMsModeEdit ) {
            activeModeEdit( unitMsEdit );
        } else {
            desactiveModeEdit();
        }
        // eslint-disable-next-line
    }, [ unitMsModeEdit, activeModeEdit ]);

    /*
        * Funcion para crear o actualizar una unidad de medida 
        * Caso 1: Crear una unidad de medida
        * Caso 2: Actualizar una unidad de medida
        * Luego Desactivamos el modo de busqueda si esta activo
        * Luego reiniciamos el input de busqueda
    */
    function handleCreateAndUpdate() {
        if( !unitMsModeEdit ) {
            createUnitMs( formValues );
        } else {
            updateUnitMs( formValues );
        }
        uiCloseModal();
        modeSearchUnitMDesactive();
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
                <legend>{ unitMsModeEdit ? 'Editar unidad de medida': 'Agregar unidad de medida' }</legend>
                
                <label htmlFor='description'>Descripción: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Ingrese la descripción de la unidad de medida'
                    name='description'
                    value={ description }
                    onChange={ handleInputChange }
                />
                        
                <input 
                    type='submit' 
                    className='btn-primary btn__edit modal-btn' 
                    value={ unitMsModeEdit ? 'Editar unidad de medida': 'Agregar unidad de medida' }
                />
            </form>
        </Modal>
    );
}

UnitMeasurementModal.prototype = {
    handleResetSearchInput: Proptypes.func.isRequired
}