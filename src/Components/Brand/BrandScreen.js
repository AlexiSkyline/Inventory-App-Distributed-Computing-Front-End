import React, { useContext, useEffect, useState } from 'react';
import { useSearch } from '../../Hooks/useSearch';

import { AlertContext } from '../../Context/Alert/AlertContext';
import { BrandContext } from '../../Context/Brand/BrandContext';

import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { BrandModal } from './BrandModal';
import { TableBrands } from './TableBrands';

const headers = [ 'id', 'descripción' ];
export const BrandScreen = () => {
    const brandContext = useContext( BrandContext );
    const { brands, getBrands, message, typeMessage, desactiveModeEditBrand,
                brandSearchFilter, brandSearchFilterStatus, activeModeSearch } = brandContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    // * State para guardar la lista de marca a mostrar
    const [ listBrands, getListBrands ] = useState([]);

    const [ formValues, handleInputChange, handleResetSearchInput ] = useSearch( { searchBrandValue: '' }, activeModeSearch );
    const { searchBrandValue } = formValues;

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
        * Obtenemos la lista de marcas para mostrar dependiendo de
        * 1: si el modo de busqueda esta activo, mostramos la lista de marcas encontradas
        * 2: caso contrario, mostramos la lista completa de marcas
    */
    useEffect( () => { 
        if( brandSearchFilterStatus ) {
            getListBrands( brandSearchFilter );
        } else {
            getListBrands( brands );
        }
    } , [ brands, brandSearchFilterStatus, brandSearchFilter ]);

    /*
        * En esta parte mandamos a llamar el metodo para obtener las marcas cuando la pagina
        * carga por primera vez o cuando se recarga la pagina
    */
    // eslint-disable-next-line
    useEffect( () => { getBrands() }, []);
    
    return (
        <main className='data__container content__page'>
            <HeadBoard
                title='Lista de todas las marcas'
            />

            <InputSearch 
                name={ 'searchBrandValue' }
                value={ searchBrandValue }
                placeholder={ 'Buscar marcas por su descripción' }
                handleInputChange={ handleInputChange }
            />

            <TableBrands
                titles={ headers }
                brands={ listBrands }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEditBrand }/>

            <FloatingButton />

            <BrandModal 
                handleResetSearchInput={ handleResetSearchInput }
            />
        </main>
    );
}