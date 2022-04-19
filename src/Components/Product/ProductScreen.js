import React from 'react'
import { TableProducts } from './TableProducts';

export const ProductScreen = () => {
    const header = ['id', 'Nombre', 'Descripción', 'Precio', 'U. Medida', 'Stock', 'Proveedor' ];

    return (
        <main className='product__container content__page'>
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
                    products={ [] }
                />
            </div>
        </main>
    );
}