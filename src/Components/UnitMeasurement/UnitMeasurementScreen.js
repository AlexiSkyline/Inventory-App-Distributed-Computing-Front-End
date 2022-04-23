import React, { useContext, useEffect, useState } from 'react'

import { AlertContext } from '../../Context/Alert/AlertContext';
import { UnitMeasurementContext } from '../../Context/UnitMeasurement/UnitMeasurementContext';

import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { TableUnitMeasurement } from './TableUnitMeasurement';

export const UnitMeasurementScreen = () => {
    const unitMeasurementContext = useContext( UnitMeasurementContext );
    const { unitMs, message, typeMessage, getUnitMs } = unitMeasurementContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

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
        * Obtenemos las unidades de medida y cargarlos en el state
        * El otro caso es obtener las unidades de medida filtrados si el status es true
    */
    useEffect( () => {
        setTimeout(() => { getUnitMs() }, 800);
        // eslint-disable-next-line
    }, [unitMs] );

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