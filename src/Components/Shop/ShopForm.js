import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/Auth/AuthContext';

import { ClientContext } from '../../Context/Client/ClientContext';
import { ProductContext } from '../../Context/Product/ProductContext';
import { initFormValues, initialInfoSale } from '../../Data/InitialFormValues';
import { useForm } from '../../Hooks/useForm';
import { useSetUpSale } from '../../Hooks/useSetUpSale';
import { SelectPaymentType } from '../UI/Select/SelectPaymentType';

export const SalesForm = () => {
    const clientContext = useContext( ClientContext );
    const { getClients, searchClientById, listClientFound, disactiveClientSearchMode } = clientContext;

    const productContext = useContext( ProductContext );
    const { getProducts, searchProductById, productSearchFilter, modeSearchProductDesactive } = productContext;
    
    const authContext = useContext( AuthContext );
    const { user } = authContext;
    initialInfoSale.seller = user.name + ' ' + user.lastName;
    initialInfoSale.idSeller = user.id;

    const [ values, handleInputChange ] = useForm( initFormValues );
    const { idClient, idProduct, amountProduct, iva, paymentType } = values;

    const toolsObject = { searchClientById, searchProductById, listClientFound, productSearchFilter }
    const [ valueFormReading, handleSearch ] = useSetUpSale( initialInfoSale, toolsObject );
    const { purchasePrice, stock, client, product, seller } = valueFormReading;
    
    useEffect( () => {
        disactiveClientSearchMode();
        modeSearchProductDesactive();
        getClients();
        getProducts();
        // eslint-disable-next-line
    } , []);

    const handleAddProduct = (e) => {
        e.preventDefault();
    }

    return (
        <div className='container__forms'>
            <form className='form__input'>
                <label>ID CLIENTE:</label>
                <input 
                    type='text' 
                    placeholder='ID CLIENTE' 
                    name='idClient'
                    value={ idClient }
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
                    name='idProduct'
                    value={ idProduct }
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
                    onClick={ handleAddProduct }
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