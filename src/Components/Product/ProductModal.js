import React, { useContext } from 'react';
import Modal from 'react-modal';
import { ModalContext } from '../../Context/Modal/ModalContext';
import { ProductContext } from '../../Context/Product/ProductContext';

export const ProductModal = () => {
    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal } = modalContext;
    const productContext = useContext( ProductContext );
    const { products, getProducts } = productContext;

    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            className="modal"
        >
            <form className='form__modal'>
                <legend>Agregar producto</legend>
                
                <label htmlFor='name'>Nombre: </label>
                <input type='text' className='form-control' placeholder='Nombre' />
                
                <label htmlFor='description'>Descripción: </label>
                <input type='text' className='form-control' placeholder='Descripción' />

                <label htmlFor='price'>Precio: </label>
                <input type='number' className='form-control' placeholder='Precio' />

                <label htmlFor='idUnitMesurement'>ID Unidad de Medida: </label>
                <input type='text' className='form-control' placeholder='ID Unidad de Medida' />
            
                <label htmlFor='idBrand'>ID de la Marca: </label>
                <input type='text' className='form-control' placeholder='ID Marca' />

                <label htmlFor='stock'>Stock: </label>
                <input type='number' className='form-control' placeholder='Stock' />
                        
                <input type='submit' className='btn-primary btn__edit modal-btn' value='Agregar Producto' />
            </form>
        </Modal>
    )
}