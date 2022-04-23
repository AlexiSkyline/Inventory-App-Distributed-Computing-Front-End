import React, { useContext } from 'react';
import Modal from 'react-modal';
import { ModalContext } from '../../Context/Modal/ModalContext';
import { UnitMeasurementContext } from '../../Context/UnitMeasurement/UnitMeasurementContext';

export const UnitMeasurementModal = () => {
    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const unitMeasurementContext = useContext( UnitMeasurementContext );
    const { unitMsModeEdit } = unitMeasurementContext;

    const handleOnSubmit = ( e ) => {}

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
                    // value={ description }
                    // onChange={ handleInputChange }
                />
                        
                <input 
                    type='submit' 
                    className='btn-primary btn__edit modal-btn' 
                    // value={ unitMsModeEdit ? 'Editar unidad de medida': 'Agregar unidad de medida' }
                />
            </form>
        </Modal>
    );
}