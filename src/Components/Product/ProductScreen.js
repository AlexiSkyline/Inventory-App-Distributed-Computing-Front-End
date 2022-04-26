import React, { useContext, useEffect, useState } from 'react';
import { useSearch } from '../../Hooks/useSearch';

import { AlertContext } from '../../Context/Alert/AlertContext';
import { ProductContext } from '../../Context/Product/ProductContext';

import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { ProductModal } from './ProductModal';
import { TableProducts } from './TableProducts';

export const ProductScreen = () => {
    const headers = ['id', 'Nombre', 'Marca','Descripción', 'Precio', 'U. Medida', 'Stock', 'Proveedor' ];
    const productContext = useContext( ProductContext );
    const { products, getProducts, searchProduct, productSearchFilter, 
                message, typeMessage, productSearchFilterStatus, desactiveModeEdit } = productContext;
    
    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    // * State para guardar la lista de producto a mostrar
    const [ listProduct, getListProduct ] = useState([]);

    const [ formValues, handleInputChange, handleResetSearchInput ] = useSearch( { searchProductValue: '' }, searchProduct );
    const { searchProductValue } = formValues;

    /*
        * Mostramos el mesaje si existe uno en el state
        * El otro caso es que no se muestre ningun mensaje
    */
    useEffect( () => {
        if( message ) {
            showAlert( message, typeMessage );
        }
        // eslint-disable-next-line
    } , [message] );

    /* 
        * Obtenemos los productos y cargarlos en el state
        * El otro caso es obtener los productos filtrados si el status es true
    */
    useEffect( () => { 
        setTimeout(() => { getProducts() }, 800 );
        if( productSearchFilterStatus ) {
            getListProduct( productSearchFilter );
        } else {
            getListProduct( products );
        }
        // eslint-disable-next-line
    } , [products, productSearchFilterStatus] );

    return (
        <main className='data__container content__page'>
            <HeadBoard 
                title='Lista de todos los productos'
            />
            
            <InputSearch
                name={ 'searchProductValue' }
                value={ searchProductValue }
                placeholder={ 'Buscar productos por la descripción' }
                handleInputChange={ handleInputChange }
            />
            
            <TableProducts 
                titles={ headers }
                products={ listProduct }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEdit }/>

            <FloatingButton />

            <ProductModal handleResetSearchInput={ handleResetSearchInput }/>
        </main>
    );
}