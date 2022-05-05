import React, { useContext, useEffect, useState } from 'react';
import { useSearch } from '../../Hooks/useSearch';

import { AlertContext } from '../../Context/Alert/AlertContext';
import { BusinessContext } from '../../Context/Business/BusinessContext';

import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { BusinessModal } from './BusinessModal';
import { TableBusiness } from './TableBusiness';

export const BusinessScreen = () => {
    const businessContext = useContext( BusinessContext );
    const { business, message, typeMessage, businessSearchFilter, businessSearchFilterStatus, 
                getBusiness, desactiveModeEditBusiness, activeModeSearch } = businessContext;
    
    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    // * State para guardar la lista de empresas a mostrar
    const [ listBusiness, getListBusiness ] = useState([]);

    const [ formValues, handleInputChange, handleResetSearchInput ] = useSearch( { searchBusinessValue: '' }, activeModeSearch );
    const { searchBusinessValue } = formValues;

     /*
        * Mostramos el mesaje si existe uno en el state
        * El otro caso es que no se muestre ningun mensaje
    */
     useEffect( () => {
        if( message ) {
            showAlert( message, typeMessage );
        }
    } , [ message, showAlert, typeMessage ]);

    /* 
        * Obtenemos la lista de empresas para mostrar dependiendo de
        * 1: Si el modo de busqueda esta activo, mostramos la lista de empresas encontradas
        * 2: Caso contrario, mostramos la lista completa de empresas
    */
    useEffect( () => {
        if( businessSearchFilterStatus ) {
            getListBusiness( businessSearchFilter );
        } else {
            getListBusiness( business );
        }
    } , [business, businessSearchFilterStatus, businessSearchFilter] );
    
    /*
        * En esta parte mandamos a llamar el metodo para obtener las empresas cuando la pagina
        * carga por primera vez o cuando se recarga la pagina
    */ 
    // eslint-disable-next-line
    useEffect( () => { getBusiness() } , []);

    return (
        <main className='data__container content__page'>
            <HeadBoard
                title='Lista de todas las empresas'
            />

            <InputSearch
                name={ 'searchBusinessValue' }
                value={ searchBusinessValue }
                placeholder={ 'Buscar empresa por su nombre' }
                handleInputChange={ handleInputChange }
            />

            <TableBusiness
                business={ listBusiness }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEditBusiness }/>

            <FloatingButton />

            <BusinessModal 
                handleResetSearchInput={ handleResetSearchInput }
            />
        </main>
    );
}