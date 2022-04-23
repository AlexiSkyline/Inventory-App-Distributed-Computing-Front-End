import React, { useContext, useEffect, useState } from 'react'
import { UnitMeasurementContext } from '../../Context/UnitMeasurement/UnitMeasurementContext';
import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { TableUnitMeasurement } from './TableUnitMeasurement';

export const UnitMeasurementScreen = () => {
    const unitMeasurementContext = useContext( UnitMeasurementContext );
    const { unitMs, getUnitMs } = unitMeasurementContext;

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

     /*
        * funcion para reiniciar el input de busqueda 
    */
     function handleResetSearchInput() {
        setFormValues({
            searchBrandValue: ''
        });
    }

    useEffect( () => {
        getUnitMs();
        // eslint-disable-next-line
    }, [] );

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
            
            <TableUnitMeasurement 
                unitMs={ unitMs }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose/>

            <FloatingButton />
        </main>
    );
}