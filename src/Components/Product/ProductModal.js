import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ModalContext } from '../../Context/Modal/ModalContext';
import { ProductContext } from '../../Context/Product/ProductContext';
import { useForm } from '../../Hooks/useForm';

const initEvent = {
    name: '',
    description: '',
    price: 0,
    idUnitMesurement: '',
    idBrand: '',
    stock: 0,
    idProvider: ''
}

export const ProductModal = () => {
    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const productContext = useContext( ProductContext );
    const { createProduct, productModeEdit, productEdit, updateProduct } = productContext;

    const [ formValues, setFormValues ] = useState( initEvent );
    const { name, description, price, idUnitMesurement, idBrand, stock, idProvider } = formValues;

    useEffect(() => {
        if( productModeEdit ) {
            setFormValues( productEdit );
        } else {
            setFormValues( initEvent );
        }
    }, [ productModeEdit, setFormValues ]);
    
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    };

    const handleOnSubmit = ( e ) => {
        e.preventDefault();
        if( !productModeEdit ) {
            createProduct( formValues );
            setFormValues( initEvent );
            uiCloseModal();
        } else {
            updateProduct( formValues );
            uiCloseModal();
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
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='ID Unidad de Medida' 
                    name='idUnitMesurement'
                    value={ idUnitMesurement }
                    onChange={ handleInputChange }
                />
            
                <label htmlFor='idBrand'>ID de la Marca: </label>
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='ID Marca' 
                    name='idBrand'
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
                <input 
                    type='text' 
                    className='form-control' 
                    placeholder='ID Proveedor' 
                    name='idProvider'
                    value={ idProvider }
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