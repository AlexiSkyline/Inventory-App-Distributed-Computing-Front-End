import React, { useContext } from 'react';
import Modal from 'react-modal';
import { ModalContext } from '../../Context/Modal/ModalContext';

export const ProductModal = () => {
    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal } = modalContext;

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
                
                <label htmlFor='lastName'>Apellidos: </label>
                <input type='text' className='form-control' placeholder='Apellidos' />

                <label htmlFor='RFC'>RFC: </label>
                <input type='text' className='form-control' placeholder='RFC' />

                <label htmlFor='address'>Dirección: </label>
                <input type='text' className='form-control' placeholder='Dirección' />
            
                <label htmlFor='Email'>Email: </label>
                <input type='email' className='form-control' placeholder='Email' />

                <label htmlFor='noCel'>Numero de Celular: </label>
                <input type='text' className='form-control' placeholder='Numero de Celular' />
                        
                <input type='submit' className='btn-primary btn__edit modal-btn' value='Agregar Producto' />
            </form>
        </Modal>
    )
}