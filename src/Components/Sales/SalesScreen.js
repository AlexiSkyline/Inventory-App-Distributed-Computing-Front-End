import React, { useContext, useEffect, useState } from 'react';
import { useSearch } from '../../Hooks/useSearch';

import { AlertContext } from '../../Context/Alert/AlertContext';
import { SalesContext } from '../../Context/Sales/SalesContext';

import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { SalesModal } from './SalesModal';
import { TableSales } from './TableSales';

export const SalesScreen = () => {
    const headers = [ 'ID', 'Vendedor', 'Cliente', 'Folio', 'Empresa', 'Total', 'IVA', 'SubTotal', 'Tipo de Pago' ,'Fecha' ];
    const salesContext = useContext( SalesContext );
    const { salesList, message, typeMessage, listSalesFound, searchModeStatus,
               getSales, desactiveModeEditSales, searchSales  } = salesContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    // * State para guardar la lista de ventas a mostrar
    const [ listSales, getListSales ] = useState([]);

    const [ formValues, handleInputChange, handleResetSearchInput ] = useSearch( { searchSalesValue: '' }, searchSales );
    const { searchSalesValue } = formValues;

     /*
        * Mostramos el mesaje si existe uno en el state
        * El otro caso es que no se muestre ningun mensaje
    */
     useEffect( () => {
        if( message ) {
            showAlert( message, typeMessage );
        }
    } , [ showAlert, message, typeMessage ]);

    /* 
        * Obtenemos la lista de ventas para mostrar dependiendo de
        * 1: Si el modo de busqueda esta activo, mostramos la lista de ventas encontradas
        * 2: Caso contrario, mostramos la lista completa de ventas
    */
    useEffect(() => {
        if( searchModeStatus ) {
            getListSales( listSalesFound );
        } else {
            getListSales( salesList );
        }
    }, [ salesList, searchModeStatus, listSalesFound ]);

    /* 
        * En esta parte mandamos a llamar el metodo para obtener las ventas cuando la pagina 
        * carga por primera vez o cuando se recarga la pagina
    */
    // eslint-disable-next-line
    useEffect(() => { getSales() }, []);
    
    return (
        <main className='data__container content__page'>
            <HeadBoard
                title='Lista de las ventas realizadas'
            />

            <InputSearch
                name={ 'searchSalesValue' }
                value={ searchSalesValue }
                placeholder={ 'Buscar venta por el folio' }
                handleInputChange={ handleInputChange }
            />
            
            <TableSales
                titles={ headers }
                listSales={ listSales }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEditSales }/>

            <SalesModal 
                handleResetSearchInput={ handleResetSearchInput }
            />
        </main>
    );
}