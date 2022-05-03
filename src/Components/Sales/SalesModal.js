import React, { useContext } from 'react';
import Proptypes from 'prop-types';
import Modal from 'react-modal';

import { ModalContext } from '../../Context/Modal/ModalContext';

import { SelectProduct } from '../UI/Select/SelectProduct';
import { SelectSeller } from '../UI/Select/SelectSeller';

export const SalesModal = ({ handleResetSearchInput }) => {
    const modalContext = useContext( ModalContext );
    const { modalOpen, closeModal, uiCloseModal } = modalContext;
    
    const [ formValues, setFormValues ] = React.useState({ searchSalesValue: '' });
    const { idSeller, idClient, folio, idBusiness, total, iva, subTotal, date, paymentType } = formValues;

    const handleInputChange = () => {};
    const handleSubmit = () => {};


    return (
        <Modal
            isOpen={ modalOpen }
            onRequestClose={ closeModal }
            className='modal'
            ariaHideApp={false}
        >
            <form className='form__modal' onSubmit={ handleSubmit }>
                <legend> Editar venta </legend>
                
                <label htmlFor='idSeller'>Vendedor: </label>
                <SelectSeller value={ idSeller } onChange={ handleInputChange } />

                <label htmlFor='idClient'>Cliente: </label>
                
                <label htmlFor='folio'>Folio: </label>
                <input 
                    type='number' 
                    className='form-control' 
                    placeholder='Folio de la venta'
                    name='folio'
                    value={ folio }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='idBusiness'>Empresa: </label>
            
                
                <label htmlFor='total'>Total: </label>
                <input 
                    type='number' 
                    className='form-control' 
                    placeholder='Ingrese el total'
                    name='total'
                    value={ total }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='iva'>IVA: </label>
                <input 
                    type='number' 
                    className='form-control' 
                    placeholder='Ingrese el IVA'
                    name='iva'
                    value={ iva }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='subTotal'>SubTotal: </label>
                <input 
                    type='number' 
                    className='form-control' 
                    placeholder='Ingrese el subTotal'
                    name='subTotal'
                    value={ subTotal }
                    onChange={ handleInputChange }
                />

                <label htmlFor='paymentType'>Tipo de pago: </label>
                <input 
                    type='tetx' 
                    className='form-control' 
                    placeholder='Ingrese el Tipo de pago'
                    name='paymentType'
                    value={ paymentType }
                    onChange={ handleInputChange }
                />
                
                <label htmlFor='date'>Fecha: </label>
                <input 
                    type='date' 
                    className='form-control'
                    name='date'
                    value={ date }
                    onChange={ handleInputChange }
                />
                        
                <input 
                    type='submit' 
                    className='btn-primary btn__edit modal-btn' 
                    value='Guardar cambios'
                />
            </form>
        </Modal>
    );
}

SalesModal.prototype = {
    handleResetSearchInput: Proptypes.func.isRequired
}