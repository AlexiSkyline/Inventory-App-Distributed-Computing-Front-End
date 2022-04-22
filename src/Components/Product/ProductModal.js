import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ModalContext } from '../../Context/Modal/ModalContext';
import { ProductContext } from '../../Context/Product/ProductContext';

// * Cuerpo inicial de nuestro inputs de agregar o editar producto
const initEvent = {
    name: '',
    description: '',
    price: 0,
    idUnitMesurement: '',
    idBrand: '',
    stock: 0,
    idProvider: ''
}

export const ProductModal = ({ handleResetInput }) => {
    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;

    const productContext = useContext( ProductContext );
    const { createProduct, productModeEdit, productEdit, updateProduct, modeSearchProductDesactive } = productContext;

    // * State para almacenar la informacion del producto a crear o actualizar
    const [ formValues, setFormValues ] = useState( initEvent );
    const { name, description, price, idUnitMesurement, idBrand, stock, idProvider } = formValues;

    /*
        * Hook para obtener los valores del para el modal 'Formulario'
        * Caso 1: Le pasa los valores del producto a editar
        * Caso 2: Le pasa los el objeto initEvent para crear un nuevo producto
    */
    useEffect(() => {
        if( productModeEdit ) {
            setFormValues( productEdit );
        } else {
            setFormValues( initEvent );
        }
        // eslint-disable-next-line
    }, [ productModeEdit, setFormValues ]);
    
     // * Funcion para obtener los valores del formulario
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    };

    /*
        * Funcion para crear o actualizar un producto 
        * Caso 1: Crear un producto
        * Caso 2: Actualizar un producto
        * Luego Desactivamos el modo de busqueda si esta activo
        * Luego reiniciamos el input de busqueda
    */
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
        modeSearchProductDesactive();
        handleResetInput();
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