import React, { useContext } from 'react';
import { SalesContext } from '../../Context/Sales/SalesContext';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';

export const SalesScreen = () => {
    const salesContext = useContext( SalesContext );
    const { salesList, message, typeMessage, listSalesFound, searchModeStatus,
               getSales, desactiveModeEditSales, searchSales  } = salesContext;

    const [ formValues, setFormValues ] = React.useState({ searchSalesValue: '' });
    const { searchSalesValue } = formValues;

    const handleInputChange = () => {}
    
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
            
            {/* <TableSales
                titles={ headers }
                listSales={ listSales }
                handleResetSearchInput={ handleResetSearchInput }
            /> */}

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEditSales }/>

            {/* <SalesModal 
                handleResetSearchInput={ handleResetSearchInput }
            /> */}
        </main>
    );
}