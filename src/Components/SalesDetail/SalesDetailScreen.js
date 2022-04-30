import React, { useContext, useEffect } from 'react'

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
                getSalesDetail, desactiveModeEdit, searchSalesDetail } = salesDetailContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    const [ formValues, setFormValues ] = React.useState({ searchSalesDetailValue: ''});
    const { searchSalesDetailValue } = formValues;
    const handleInputChange = () => {}
    const handleResetSearchInput = () => {}
    
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
    
    useEffect(() => {
        getSalesDetail();
    }, [salesDetailList]);
    
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
                listSalesDetail={ salesDetailList }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEdit }/>

            <SalesDetailModal 
                handleResetSearchInput={ handleResetSearchInput }
            />
        </main>
    );
}