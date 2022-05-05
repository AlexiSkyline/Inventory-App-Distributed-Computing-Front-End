import React, { useContext, useEffect, useState } from 'react';
import { useSearch } from '../../Hooks/useSearch';

import { AlertContext } from '../../Context/Alert/AlertContext';
import { SalesDetailContext } from '../../Context/SalesDetail/SalesDetailContext';

import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { SalesDetailModal } from './SalesDetailModal';
import { TableSalesDetail } from './TableSalesDetail';

export const SalesDetailScreen = () => {
    const headers = [ 'ID', 'Folio', 'Producto', 'Cantidad', 'Precio', 'Total', 'Fecha' ];
    const salesDetailContext = useContext( SalesDetailContext );
    const { salesDetailList, message, typeMessage, listSalesDetailFound, searchModeStatus,
                getSalesDetail, desactiveModeEditSalesDetail, searchSalesDetail } = salesDetailContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    // * State para guardar la lista de detalles ventas a mostrar
    const [ listSalesDetail, getListSalesDetail ] = useState([]);

    const [ formValues, handleInputChange, handleResetSearchInput ] = useSearch( { searchSalesDetailValue: '' }, searchSalesDetail );
    const { searchSalesDetailValue } = formValues;
    
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
        * Obtenemos la lista de detalles ventas para mostrar dependiendo de
        * 1: Si el modo de busqueda esta activo, mostramos la lista de detalles ventas encontrados
        * 2: Caso contrario, mostramos la lista completa de detalles ventas
    */
    useEffect(() => {
        if( searchModeStatus ) {
            getListSalesDetail( listSalesDetailFound );
        } else {
            getListSalesDetail( salesDetailList );
        }
    }, [ salesDetailList, searchModeStatus, listSalesDetailFound ]);

    /*
        * En esta parte mandamos a llamar el metodo para obtener las detalles ventas
        * cuando la pagina se carga por primera vez
    */
    // eslint-disable-next-line
    useEffect(() => { getSalesDetail() }, []);
    
    return (
        <main className='data__container content__page'>
            <HeadBoard
                title='Lista detalle de ventas'
            />

            <InputSearch
                name={ 'searchSalesDetailValue' }
                value={ searchSalesDetailValue }
                placeholder={ 'Buscar venta por el folio' }
                handleInputChange={ handleInputChange }
            />
            
            <TableSalesDetail
                titles={ headers }
                listSalesDetail={ listSalesDetail }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEditSalesDetail }/>

            <SalesDetailModal 
                handleResetSearchInput={ handleResetSearchInput }
            />
        </main>
    );
}