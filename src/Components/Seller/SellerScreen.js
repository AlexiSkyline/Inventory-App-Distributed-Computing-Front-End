import React, { useContext, useEffect, useState } from 'react';
import { useSearch } from '../../Hooks/useSearch';

import { AlertContext } from '../../Context/Alert/AlertContext';
import { SellerContext } from '../../Context/Seller/SellerContext';

import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';
import { SellerModal } from './SellerModal';
import { TableSeller } from './TableSeller';

export const SellerScreen = () => {
    const headers = [ 'ID' ,'Nombre' ,'Apellidos' ,'RFC' ,'Dirección' ,'Email' ,'Telefono', 'Nombre de Usuario' ];
    const sellerContext = useContext( SellerContext );
    const { sellerList, message, typeMessage, listSellerFound, searchModeStatus,
                getSellers, desactiveModeEditSeller, searchSeller  } = sellerContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    // * State para guardar la lista de Clientes a mostrar
    const [ listSellers, getListSellers ] = useState([]);

    const [ formValues, handleInputChange, handleResetSearchInput ] = useSearch( { searchSellerValue: '' }, searchSeller );
    const { searchSellerValue } = formValues;

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
        * Obtenemos la lista de vendedores para mostrar dependiendo de
        * 1: Si el modo de busqueda esta activo, mostramos la lista de vendedores encontrados
        * 2: Caso contrario, mostramos la lista completa de vendedores
    */
    useEffect( () => {
        if( searchModeStatus ) {
            getListSellers( listSellerFound );
        } else {
            getListSellers( sellerList );
        }
    }, [ sellerList, searchModeStatus, listSellerFound ]);
    
    /*
        * En esta parte mandamos a llamar el metodo para obtener los vendedores cuando la pagina
        * carga por primera vez o cuando se recarga la pagina
    */
    // eslint-disable-next-line
    useEffect( () => { getSellers() } , []);

    return (
        <main className='data__container content__page'>
            <HeadBoard
                title='Lista de todos los vendedores'
            />

            <InputSearch
                name={ 'searchSellerValue' }
                value={ searchSellerValue }
                placeholder={ 'Buscar vendedores por su nombre' }
                handleInputChange={ handleInputChange }
            />
            
            <TableSeller
                titles={ headers }
                listSeller={ listSellers }
                handleResetSearchInput={ handleResetSearchInput }
            />

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEditSeller }/>

            <FloatingButton />

            <SellerModal 
                handleResetSearchInput={ handleResetSearchInput }
            />
        </main>
    );
}