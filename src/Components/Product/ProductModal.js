import React, { useContext, useEffect } from 'react';
import Modal from 'react-modal';
import Proptypes from 'prop-types';

import { ModalContext } from '../../Context/Modal/ModalContext';
import { ProductContext } from '../../Context/Product/ProductContext';
import { ModeEditContext } from '../../Context/ModeEdit/ModeEditContext';

import { useValidation } from '../../Hooks/useValidation';
import { initialFormValuesProduct } from '../../Data/InitialFormValues';
import { ValidateProduct } from '../../validations/ValidateProduct';
import { SelectUnitMeasurement } from '../UI/Select/SelectUnitMeasurement';
import { SelectBrand } from '../UI/Select/SelectBrand';
import { SelectProvider } from '../UI/Select/SelectProvider';

export const ProductModal = ({ handleResetSearchInput }) => {
    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const productContext = useContext( ProductContext );
    const { createProduct, productModeEdit, productEdit, updateProduct, modeSearchProductDesactive } = productContext;

    const modeEditContext = useContext( ModeEditContext );
    const { activeModeEdit, desactiveModeEdit } = modeEditContext;
    
    const [ formValues, handleSubmit, handleInputChange ] = useValidation( initialFormValuesProduct, ValidateProduct, handleCreateAndUpdate );
    const { name ,description ,price ,idUnitMesurement ,idBrand ,stock ,idProvider } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Caso 1: Le pasa los valores del producto a editar
        * Caso 2: Le pasa los el objeto initEvent para crear un nuevo producto
    */
    useEffect(() => {
        if( productModeEdit ) {
            activeModeEdit( productEdit );
        } else {
            desactiveModeEdit();
        }
        // eslint-disable-next-line
    }, [ productModeEdit, activeModeEdit ]);
    
    /*
        * Funcion para crear o actualizar un producto 
        * Caso 1: Crear un producto
        * Caso 2: Actualizar un producto
        * Luego Desactivamos el modo de busqueda si esta activo
        * Luego reiniciamos el input de busqueda
    */
    function handleCreateAndUpdate() {
        if( !productModeEdit ) {
            createProduct( formValues );
        } else {
            updateProduct( formValues );
        }
        uiCloseModal();
        modeSearchProductDesactive();
        handleResetSearchInput();
    }

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            className="modal"
            ariaHideApp={false}
        >
            <form className='form__modal' onSubmit={ handleSubmit }>
                <legend>{ productModeEdit ? 'Editar Producto': 'Agregar producto' }</legend>
                
                <label htmlFor='name'>Nombre: </label>
                <input 
                    type='text' 
                    className='form-control'
                    placeholder='name'
                    name='name'
                    value={ name }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='description'>Descripción: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Descripción'
                    name='description'
                    value={ description }
                    onChange={ handleInputChange }
                />

                <label htmlFor='price'>Precio: </label>
                <input 
                    type='number' 
                    className='form-control' 
                    placeholder='Precio' 
                    name='price'
                    value={ price }
                    onChange={ handleInputChange }
                />

                <label htmlFor='idUnitMesurement'>ID Unidad de Medida: </label>
                <SelectUnitMeasurement 
                    value={ idUnitMesurement } 
                    onChange={ handleInputChange }
                />
            
                <label htmlFor='idBrand'>ID de la Marca: </label>
                <SelectBrand 
                    value={ idBrand } 
                    onChange={ handleInputChange }
                />

                <label htmlFor='stock'>Stock: </label>
                <input 
                    type='number' 
                    className='form-control' 
                    placeholder='Stock' 
                    name='stock'
                    value={ stock }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='idProvider'>ID Proveedor: </label>
                <SelectProvider value={ idProvider } onChange={ handleInputChange }/>
                        
                <input 
                    type='submit' 
                    className='btn-primary btn__edit modal-btn' 
                    value={ productModeEdit ? 'Editar Producto': 'Agregar producto' }
                />
            </form>
        </Modal>
    );
}

ProductModal.prototype = {
    handleResetSearchInput: Proptypes.func.isRequired
}