import React, { useState } from 'react'
import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';

export const UnitMeasurementScreen = () => {
    // * State para almacenar el parametro de busqueda
    const [ formValues, setFormValues ] = useState({
        searchUnitMsValue: ''
    });
    const { searchUnitMsValue } = formValues;

    // * Funcion para obtener el parametro de busqueda
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    };

    return (
        <main className='data__container content__page'>
            <HeadBoard
                title='Lista de todas las unidades de medida'
            />

            <InputSearch
                name={ 'searchUnitMsValue' }
                value={ searchUnitMsValue }
                placeholder={ 'Buscar unidad de medida por su descripción' }
                handleInputChange={ handleInputChange }
            />

            <FloatingButtonClose/>

            <FloatingButton />
        </main>
    );
}