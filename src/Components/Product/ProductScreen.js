import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../../Context/Product/ProductContext';
import { TableProducts } from './TableProducts';

export const ProductScreen = () => {
    const header = ['id', 'Nombre', 'Marca','Descripción', 'Precio', 'U. Medida', 'Stock', 'Proveedor' ];
    const productContext = useContext( ProductContext );
    const { products, getProducts } = productContext;

    useEffect( () => { getProducts() } , [] );

    return (
        <main className='data__container content__page'>
            <h1>Todos los productos</h1>
            
            <div className='input__search-box'>
                <input 
                    type='text'
                    placeholder='Buscar un producto por su descripción'
                    className='form-control'
                    name='busqueda'
                />
            </div>
            
            <div className='table__container'>
                <TableProducts 
                    titles={ header }
                    products={ products }
                />
            </div>
        </main>
    );
}