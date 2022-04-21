import React, { useContext } from 'react';
import Modal from 'react-modal';
import { ModalContext } from '../../Context/Modal/ModalContext';
import { ProductContext } from '../../Context/Product/ProductContext';
import { useForm } from '../../Hooks/useForm';

export const ProductModal = () => {
    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const productContext = useContext( ProductContext );
    const { createProduct, productModeEdit } = productContext;

    const [ formValue, handleInputChange, resetInputs ] = useForm({
        name: '',
        description: '',
        price: 0,
        idUnitMesurement: '',
        idBrand: '',
        stock: 0,
        idProvider: ''
    });

    const handleOnSubmit = ( e ) => {
        e.preventDefault();
        if( !productModeEdit ) {
            createProduct( formValue );
            resetInputs();
            uiCloseModal();
        } else {
            
        }
    }

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            className="modal"
            ariaHideApp={false}
        >
            <form className='form__modal' onSubmit={ handleOnSubmit }>
                <legend>{ productModeEdit ? 'Editar Producto': 'Agregar producto' }</legend>
                
                <label htmlFor='name'>Nombre: </label>
                <input 
                    type='text' 
                    className='form-control'
                    placeholder='name'
                    name='name'
                    value={ formValue.name }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='description'>Descripción: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='Descripción'
                    name='description'
                    value={ formValue.description }
                    onChange={ handleInputChange }
                />

                <label htmlFor='price'>Precio: </label>
                <input 
                    type='number' 
                    className='form-control' 
                    placeholder='Precio' 
                    name='price'
                    value={ formValue.price }
                    onChange={ handleInputChange }
                />

                <label htmlFor='idUnitMesurement'>ID Unidad de Medida: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='ID Unidad de Medida' 
                    name='idUnitMesurement'
                    value={ formValue.idUnitMesurement }
                    onChange={ handleInputChange }
                />
            
                <label htmlFor='idBrand'>ID de la Marca: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='ID Marca' 
                    name='idBrand'
                    value={ formValue.idBrand }
                    onChange={ handleInputChange }
                />

                <label htmlFor='stock'>Stock: </label>
                <input 
                    type='number' 
                    className='form-control' 
                    placeholder='Stock' 
                    name='stock'
                    value={ formValue.stock }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='idProvider'>ID Proveedor: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='ID Proveedor' 
                    name='idProvider'
                    value={ formValue.idProvider }
                    onChange={ handleInputChange }
                />
                        
                <input 
                    type='submit' 
                    className='btn-primary btn__edit modal-btn' 
                    value={ productModeEdit ? 'Editar Producto': 'Agregar producto' }
                />
            </form>
        </Modal>
    )
}