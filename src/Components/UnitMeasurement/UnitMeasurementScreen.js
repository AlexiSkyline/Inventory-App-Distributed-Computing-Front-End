import React, { useContext, useEffect, useState } from 'react'
import { useSearch } from '../../Hooks/useSearch';

import { AlertContext } from '../../Context/Alert/AlertContext';
import { UnitMeasurementContext } from '../../Context/UnitMeasurement/UnitMeasurementContext';

import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { TableUnitMeasurement } from './TableUnitMeasurement';
import { UnitMeasurementModal } from './UnitMeasurementModal';

export const UnitMeasurementScreen = () => {
    const unitMeasurementContext = useContext( UnitMeasurementContext );
    const { unitMs, message, typeMessage, unitMsSearchFilter, unitMsSearchFilterStatus,
            getUnitMs, desactiveModeEdit, activeModeSearch } = unitMeasurementContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    // * State para guardar la lista de unidad de medida a mostrar
    const [ listUnitMs, getListUnitMs ] = useState([]);

    const { formValues, handleInputChange, handleResetSearchInput} = useSearch( { searchUnitMsValue: '' }, activeModeSearch );
    const { searchUnitMsValue } = formValues;

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
        setTimeout(() => { getUnitMs() }, 800 );
        if( unitMsSearchFilterStatus ) {
            getListUnitMs( unitMsSearchFilter );
        } else {
            getListUnitMs( unitMs );
        }
        // eslint-disable-next-line
    }, [unitMs, unitMsSearchFilterStatus] );

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
                unitMs={ listUnitMs }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEdit }/>

            <FloatingButton />

            <UnitMeasurementModal 
                handleResetSearchInput={ handleResetSearchInput }
            />
        </main>
    );
}