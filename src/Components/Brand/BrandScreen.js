import React, { useContext } from 'react';
import { BrandContext } from '../../Context/Brand/BrandContext';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';

export const BrandScreen = () => {
    const brandContext = useContext( BrandContext );
    const { getBrands } = brandContext;

    getBrands();
    return (
        <main className='data__container content__page'>
            <HeadBoard
                title='Lista de todos las marcas'
            />
        </main>
    );
}