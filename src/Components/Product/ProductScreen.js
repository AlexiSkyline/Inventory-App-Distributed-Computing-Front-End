import React, { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../../Context/Alert/AlertContext';

import { ProductContext } from '../../Context/Product/ProductContext';

import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { ProductModal } from './ProductModal';
import { TableProducts } from './TableProducts';

export const ProductScreen = () => {
    const header = ['id', 'Nombre', 'Marca','Descripción', 'Precio', 'U. Medida', 'Stock', 'Proveedor' ];
    const productContext = useContext( ProductContext );
    const { products, getProducts, searchProduct, productSearchFilter, 
                message, typeMessage, productSearchFilterStatus } = productContext;
    
    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    // * State para guardar la lista de producto a mostrar
    const [ listProduct, getListProduct ] = useState([]);

    // * State para almacenar el parametro de busqueda
    const [ formValues, setFormValues ] = useState({
        searchProductValue: ''
    });
    const { searchProductValue } = formValues;

    // * Funcion para obtener el parametro de busqueda
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
        searchProduct( target.value );
    };

    /*
        * funcion para reiniciar el input de busqueda 
    */
    function handleResetInput() {
        setFormValues({
            searchProductValue: ''
        });
    }

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
        getProducts();
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
                titles={ header }
                products={ listProduct }
                handleResetInput={ handleResetInput }
            />

            <FloatingButtonClose />
            <FloatingButton />
            <ProductModal 
                handleResetInput={ handleResetInput }
            />
        </main>
    );
}