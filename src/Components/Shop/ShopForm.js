import React, { useContext, useEffect } from 'react';
import { AlertContext } from '../../Context/Alert/AlertContext';

import { AuthContext } from '../../Context/Auth/AuthContext';
import { ClientContext } from '../../Context/Client/ClientContext';
import { NewSaleContext } from '../../Context/NewSale/NewSaleContext';
import { ProductContext } from '../../Context/Product/ProductContext';

import { initFormValues, initialInfoSale } from '../../Data/InitialFormValues';
import { useSetUpSale } from '../../Hooks/useSetUpSale';
import { useValidation } from '../../Hooks/useValidation';
import { ValidateNewSale } from '../../validations/ValidateNewSale';
import { SelectPaymentType } from '../UI/Select/SelectPaymentType';

export const SalesForm = () => {
    const clientContext = useContext( ClientContext );
    const { getClients, disactiveClientSearchMode } = clientContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    const productContext = useContext( ProductContext );
    const { getProducts, modeSearchProductDesactive } = productContext;
    
    const authContext = useContext( AuthContext );
    const { user } = authContext;
    initialInfoSale.seller = user.name + ' ' + user.lastName;
    initialInfoSale.idSeller = user.id;

    const newSalesContext = useContext( NewSaleContext );
    const { addCart, AddInfoSale } = newSalesContext;

    const [ values, handleSubmit, handleInputChange, handleResetInput ] = useValidation( initFormValues, ValidateNewSale, handleAddProduct, 
                                                                { idProductI: '', amountProduct: '' });
    const { idClientI, idProductI, amountProduct, iva, paymentType } = values;

    const [ valueFormReading, handleSearch, handleResetView ] = useSetUpSale( initialInfoSale );
    const { idProduct, purchasePrice, stock, client, product, seller, idClient } = valueFormReading;

    useEffect( () => {
        disactiveClientSearchMode();
        modeSearchProductDesactive();
        getClients();
        getProducts();
        // eslint-disable-next-line
    } , []);

    function handleAddProduct () {
        if( !product ) {
            return showAlert( 'Error Busque un Producto', 'alert-error' );
        }
        if( !client ) {
            return showAlert( 'Error Busque un Cliente', 'alert-error' );
        }
        
        if( amountProduct > stock ) {
            return showAlert( 'Error, No hay suficiente stock', 'alert-error' );
        }

        if( amountProduct <= 0 ) {
            return showAlert( 'Error, La cantidad debe ser mayor a 0', 'alert-error' );
        }

        if( product && client ) {
            addCart({ idProduct, product, amountProduct, iva, purchasePrice });
            modeSearchProductDesactive();
            AddInfoSale({ idSeller: user.id, idClient, paymentType });
        }
    }

    const handleInputReset = (e) => {
        e.preventDefault();
        handleResetInput();
        handleResetView();
    }

    return (
        <div className='container__forms'>
            <form className='form__input'>
                <label>ID CLIENTE:</label>
                <input 
                    type='text' 
                    placeholder='ID CLIENTE' 
                    name='idClientI'
                    value={ idClientI }
                    onChange={ handleInputChange }
                />
                <button
                    className='btn__search btn__search-client'
                    onClick={ handleSearch }
                >
                    BUSCAR C
                </button>

                <label>ID PRODUCTO:</label>
                <input 
                    type='text' 
                    placeholder='ID PRODUCTO' 
                    name='idProductI'
                    value={ idProductI }
                    onChange={ handleInputChange }
                />
                <button
                    className='btn__search btn__search-product'
                    onClick={ handleSearch }
                >
                    BUSCAR P
                </button>

                <label>PRECIO:</label>
                <input 
                    type='number' 
                    placeholder='PRECIO'
                    name='purchasePrice'
                    value={ purchasePrice } 
                    readOnly
                />
                <button
                    className='btn__add'
                    onClick={ handleSubmit }
                >
                    AGREGAR P
                </button>

                <label>CANTIDAD:</label>
                <input 
                    type='number' 
                    placeholder='CANTIDAD' 
                    name='amountProduct'
                    value={ amountProduct }
                    onChange={ handleInputChange }
                />
                <button
                    className='btn__delete'
                    onClick={ handleInputReset}
                >
                    Limpiar
                </button>

                <label>IVA:</label>
                <input 
                    type='number' 
                    placeholder='IVA' 
                    name='iva'
                    value={ iva }
                    onChange={ handleInputChange }
                />
            </form>

            <form className='form__reading'>
                <label>CLIENTE:</label>
                <input type='text' placeholder='CLIENTE' value={ client } name='client' readOnly/>

                <label>PRODUCTO:</label>
                <input type='text' placeholder='PRODUCTO' value={ product } name='product' readOnly/>
                
                <label>STOCK:</label>
                <input type='number' placeholder='STOCK' value={ stock } name='stock' readOnly/>

                <label>VENDEDOR:</label>
                <input type='text' placeholder='VENDEDOR' value={ seller } name='seller' readOnly/>

                <label>TIPO DE PAGO:</label>
                <SelectPaymentType value={ paymentType } onChange={ handleInputChange }/>
            </form>
        </div>
    );
}