import React, { useContext, useEffect } from 'react';

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

    const [ formValues, setFormValues ] = React.useState({ searchSalesValue: '' });
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

    const handleInputChange = () => {}
    const handleResetSearchInput = () => {}

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
                listSales={ salesList }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEditSales }/>

            <SalesModal 
                handleResetSearchInput={ handleResetSearchInput }
            />
        </main>
    );
}