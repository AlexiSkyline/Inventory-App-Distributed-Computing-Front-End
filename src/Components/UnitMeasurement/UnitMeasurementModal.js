import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Proptypes from 'prop-types';
import { ModalContext } from '../../Context/Modal/ModalContext';
import { UnitMeasurementContext } from '../../Context/UnitMeasurement/UnitMeasurementContext';

// * Cuerpo inicial de nuestro inputs de agregar o editar unidad de medida
const initEvent = {
    description: ''
}

export const UnitMeasurementModal = ({ handleResetSearchInput }) => {
    const unitMeasurementContext = useContext( UnitMeasurementContext );
    const { unitMsModeEdit, unitMsEdit, createUnitMs, updateUnitMs, 
                modeSearchUnitMDesactive } = unitMeasurementContext;

    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    // * State para almacenar la informacion de la unidad de medida a crear o actualizar
    const [ formValues, setFormValues ] = useState( initEvent );
    const { description } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Caso 1: Le pasa los valores de la unidad de medida a editar
        * Caso 2: Le pasa los el objeto initEvent para crear una nueva unidad de medida
    */
    useEffect(() => {
        if( unitMsModeEdit ) {
            setFormValues( unitMsEdit );
        } else {
            setFormValues( initEvent );
        }
        // eslint-disable-next-line
    }, [ unitMsModeEdit, setFormValues ]);

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
        e.preventDefault();
        if( !unitMsModeEdit ) {
            createUnitMs( formValues );
        } else {
            updateUnitMs( formValues );
        }
        setFormValues( initEvent );
        uiCloseModal();
        handleResetInput();
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
            <form className='form__modal' onSubmit={ handleOnSubmit }>
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