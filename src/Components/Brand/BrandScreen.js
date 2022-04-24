import React, { useContext, useEffect, useState } from 'react';

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
    const { brands, getBrands, message, typeMessage, desactiveModeEdit,
                brandSearchFilter, brandSearchFilterStatus, activeModeSearch } = brandContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    // * State para guardar la lista de marca a mostrar
    const [ listBrands, getListBrands ] = useState([]);

    // * State para almacenar el parametro de busqueda
    const [ formValues, setFormValues ] = useState({
        searchBrandValue: ''
    });
    const { searchBrandValue } = formValues;

    // * Funcion para obtener el parametro de busqueda
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });

        activeModeSearch( target.value );
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
        * Obtenemos las marcas y cargarlos en el state
        * El otro caso es obtener las marcas filtrados si el status es true
    */
    useEffect( () => { 
        setTimeout(() => { getBrands() }, 800);
        if( brandSearchFilterStatus ) {
            getListBrands( brandSearchFilter );
        } else {
            getListBrands( brands );
        }
        // eslint-disable-next-line
    } , [brands, brandSearchFilterStatus] );
    
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

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEdit }/>

            <FloatingButton />

            <BrandModal 
                handleResetSearchInput={ handleResetSearchInput }
            />
        </main>
    );
}