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
                message, typeMessage, productSearchFilterStatus, desactiveModeEditProduct } = productContext;
    
    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    // * State para guardar la lista de producto a mostrar
    const [ listProduct, setListProduct ] = useState([]);

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
    } , [ message, showAlert, typeMessage ]);

    /*
        * Obtenemos la lista de productos para mostrar dependiendo de 
        * 1: si el modo de busqueda esta activo, mostramos la lista de productos encontrados
        * 2: caso contrario, mostramos la lista completa de productos
    */
    useEffect( () => { 
        if( productSearchFilterStatus ) {
            setListProduct( productSearchFilter );
        } else {
            setListProduct( products );
        }
    } , [ products, productSearchFilterStatus, productSearchFilter ]);

    /*
        * En esta parte mandamos a llamar el metodo para obtener los productos cuando la pagina
        * carga por primera vez o cuando se recarga la pagina
    */
    // eslint-disable-next-line
    useEffect( () => { getProducts() } , []);
    
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

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEditProduct }/>

            <FloatingButton />

            <ProductModal handleResetSearchInput={ handleResetSearchInput }/>
        </main>
    );
}