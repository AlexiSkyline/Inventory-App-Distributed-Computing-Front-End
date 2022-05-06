import React from 'react';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';
import { SalesForm } from './SalesForm';

export const NewSales = () => {
    return (
        <main className='data__container content__page sales__page'>
            <HeadBoard
                title='Nueva Venta'
            />

            <div className='info__page-sales'>
                <p className='date'>Fecha:  2022-05-06</p>
                <p className='folio'>Folio:  #3</p>
                <p className='total'>Total a pagar: $2000</p>
            </div>

            <SalesForm />

            <div className='container__buttons'>
                <button 
                    type='submit'
                    className='btn__edit'
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