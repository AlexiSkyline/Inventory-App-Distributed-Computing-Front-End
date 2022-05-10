import React, { useContext, useEffect } from 'react';

import { AlertContext } from '../../Context/Alert/AlertContext';
import { NewSaleContext } from '../../Context/NewSale/NewSaleContext';

import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { SalesForm } from './ShopForm';
import { TableProduct } from './TableShop';

export const ShopScreen = () => {
    const newSalesContext = useContext( NewSaleContext );
    const { totalSale, date, addSale, message, typeMessage, folio, getFolio } = newSalesContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    /*
        * Este hook se ejecuta cuando se carga la página
        * para obtener el folio de la venta
    */
    // eslint-disable-next-line
    useEffect( () => { getFolio() } , []);

    /*
        * Mostramos el mesaje si existe uno en el state
        * El otro caso es que no se muestre ningun mensaje
    */
    useEffect( () => {
        if( message ) {
            showAlert( message, typeMessage );
        }
    } , [ showAlert, message, typeMessage ]);

    return (
        <main className='data__container content__page sales__page'>
            <HeadBoard
                title='Generar nueva venta'
            />

            <div className='info__page-sales'>
                <p className='date'>Fecha: <span>{ date }</span></p>
                <p className='folio'>Folio:  <span>#{ folio }</span></p>
                <p className='total'>Total a pagar: <span>${ totalSale }</span></p>
            </div>

            <SalesForm />

            <TableProduct />

            <div className='container__buttons'>
                <button 
                    type='submit'
                    className='btn__edit'
                    onClick={ addSale }
                >
                    GUARDAR
                </button>

                <button 
                    type='submit'
                    className='btn__delete'
                >
                    CANCELAR
                </button>
            </div>
        </main>
    );
}