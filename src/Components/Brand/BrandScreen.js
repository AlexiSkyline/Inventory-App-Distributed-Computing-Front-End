import React, { useContext, useEffect, useState } from 'react';
import { BrandContext } from '../../Context/Brand/BrandContext';
import { useForm } from '../../Hooks/useForm';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { TableBrands } from './TableBrands';

const headers = [ 'id', 'descripción' ];
export const BrandScreen = () => {
    const brandContext = useContext( BrandContext );
    const { brands, getBrands } = brandContext;

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

    useEffect(() => {
        getBrands();
        // eslint-disable-next-line
    }, [])
    
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

            <div className='table__container'>
                <TableBrands
                    titles={ headers }
                    brands={ brands }
                />
            </div>
        </main>
    );
}