import React, { useContext } from 'react'
import { SalesDetailContext } from '../../Context/SalesDetail/SalesDetailContext';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';

export const SalesDetailScreen = () => {
    const salesDetailContext = useContext( SalesDetailContext );
    const { salesDetailList, message, typeMessage, listSalesDetailFound, searchModeStatus,
                getSalesDetail, desactiveModeEdit, searchSalesDetail } = salesDetailContext;

    const [ formValues, setFormValues ] = React.useState({ searchSalesDetailValue: ''});
    const { searchSalesDetailValue } = formValues;
    const handleInputChange = () => {}

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
            
            {/* <TableSalesDetail
                titles={ headers }
                listSalesDetail={ listSalesDetails }
                handleResetSearchInput={ handleResetSearchInput }
            /> */}

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEdit }/>

            {/* <SalesDetailModal 
                handleResetSearchInput={ handleResetSearchInput }
            /> */}
        </main>
    );
}