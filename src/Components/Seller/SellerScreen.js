import React, { useContext } from 'react';

import { SellerContext } from '../../Context/Seller/SellerContext';

import { FloatingButton } from '../UI/FloatingButton/FloatingButton';
import { FloatingButtonClose } from '../UI/FloatingButton/FloatingButtonClose';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { InputSearch } from '../UI/InputSearch/InputSearch';

export const SellerScreen = () => {
    const headers = [ 'ID' ,'Nombre' ,'Apellidos' ,'RFC' ,'Dirección' ,'Email' ,'Telefono', 'Nombre de Usuario' ];
    const sellerContext = useContext( SellerContext );
    const { sellerList, message, typeMessage, listSellerFound, searchModeStatus,
                getSellers, desactiveModeEdit, searchSeller  } = sellerContext;

    return (
        <main className='data__container content__page'>
            <HeadBoard
                title='Lista de todos los vendedores'
            />

            <InputSearch
                // name={ 'searchSellerValue' }
                // value={ searchSellerValue }
                placeholder={ 'Buscar vendedores por su nombre' }
                // handleInputChange={ handleInputChange }
            />
            
            {/* <TableSeller
                titles={ headers }
                listSeller={ listSeller }
                handleResetSearchInput={ handleResetSearchInput }
            /> */}

            <FloatingButtonClose desactiveModeEdit={ desactiveModeEdit }/>

            <FloatingButton />

            {/* <SellerModal 
                handleResetSearchInput={ handleResetSearchInput }
            /> */}
        </main>
    );
}