import React, { useContext, useEffect } from 'react';
import { BrandContext } from '../../Context/Brand/BrandContext';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { TableBrands } from './TableBrands';

const headers = [ 'id', 'descripción' ];
export const BrandScreen = () => {
    const brandContext = useContext( BrandContext );
    const { brands, getBrands } = brandContext;

    useEffect(() => {
        getBrands();
        // eslint-disable-next-line
    }, [])
    
    return (
        <main className='data__container content__page'>
            <HeadBoard
                title='Lista de todas las marcas'
            />

            <div className='table__container'>
                <TableBrands
                    titles={ headers }
                    brands={ brands }
                />
            </div>
        </main>
    );
}