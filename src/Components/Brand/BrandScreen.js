import React, { useContext, useEffect, useState } from 'react';

import { AlertContext } from '../../Context/Alert/AlertContext';
import { BrandContext } from '../../Context/Brand/BrandContext';

import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { BrandModal } from './BrandModal';
import { TableBrands } from './TableBrands';

const headers = [ 'id', 'descripción' ];
export const BrandScreen = () => {
    const brandContext = useContext( BrandContext );
    const { brands, getBrands, message, typeMessage,  } = brandContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    // * State para almacenar el parametro de busqueda
    const [ formValues, setFormValues ] = useState({
        searchBrandValue: ''
    });
    const { searchBrandValue } = formValues;

    // * Funcion para obtener el parametro de busqueda
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    };

    useEffect( () => {
        if( message ) {
            showAlert( message, typeMessage );
        }
        // eslint-disable-next-line
    } , [message] );

    useEffect(() => {
        getBrands();
    }, [brands])
    
    return (
        <main className='data__container content__page'>
            <HeadBoard
                title='Lista de todas las marcas'
            />

            <InputSearch 
                name={ 'searchBrandValue' }
                value={ searchBrandValue }
                placeholder={ 'Buscar marcas por su descripción' }
                handleInputChange={ handleInputChange }
            />

            <TableBrands
                titles={ headers }
                brands={ brands }
            />

            <FloatingButtonClose />
            <FloatingButton />

            <BrandModal />
        </main>
    );
}