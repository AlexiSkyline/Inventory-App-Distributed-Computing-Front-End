import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../Context/Alert/AlertContext';
import { ProductContext } from '../../Context/Product/ProductContext';
import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { ProductModal } from './ProductModal';
import { TableProducts } from './TableProducts';

export const ProductScreen = () => {
    const header = ['id', 'Nombre', 'Marca','Descripción', 'Precio', 'U. Medida', 'Stock', 'Proveedor' ];
    const productContext = useContext( ProductContext );
    const { products, getProducts, message, typeMessage, 
            searchProduct, productSearchFilter, productSearchFilterStatus } = productContext;

    const alertContext = useContext( AlertContext );
    const { alert, showAlert } = alertContext;

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

    return (
        <main className='data__container content__page'>
            { alert && <div className={ `alerta ${ alert.type }` }> { alert.msg } </div> }

            <h1>Todos los productos</h1>
            
            <div className='input__search-box'>
                <input 
                    type='text'
                    placeholder='Buscar un producto por su descripción'
                    className='form-control'
                    name='searchProductValue'
                    value={ searchProductValue }
                    onChange={ handleInputChange }
                />
            </div>
            
            <div className='table__container'>
                <TableProducts 
                    titles={ header }
                    products={ listProduct }
                    handleResetInput={ handleResetInput }
                />
            </div>

            <FloatingButtonClose />
            <FloatingButton />
            <ProductModal 
                handleResetInput={ handleResetInput }
            />
        </main>
    );
}