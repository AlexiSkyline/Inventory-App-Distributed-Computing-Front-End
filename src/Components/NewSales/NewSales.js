import React from 'react';
import { HeadBoard } from '../UI/HeadBoard/HeadBoard';

export const NewSales = () => {
    return (
        <main className='data__container content__page'>
            <HeadBoard
                title='Puntos de Venta'
            />

            <div>
                <p>En este apartado podrás realizar una nueva venta</p>
                <p>Folio:  #3</p>
                <p>Fecha:  2022-05-06</p>
                <p>Total a pagar: $2000</p>

                <div className='container__forms'>
                    <form className='form__input'>
                        <label>ID CLIENTE:</label>
                        <input type='text' placeholder='ID CLIENTE' />
                        <button type='submit'>BUSCAR</button>

                        <label>ID PRODUCTO:</label>
                        <input type='text' placeholder='ID PRODUCTO' />
                        <button type='submit'>BUSCAR</button>

                        <label>PRECIO:</label>
                        <input type='number' placeholder='PRECIO' readOnly/>
                        <button type='submit'>AGREGAR</button>

                        <label>CANTIDAD:</label>
                        <input type='number' placeholder='CANTIDAD' />
                    </form>

                    <form className='form__reading'>
                        <label>CLIENTE:</label>
                        <input type='text' placeholder='CLIENTE' readOnly/>

                        <label>PRODUCTO:</label>
                        <input type='text' placeholder='PRODUCTO' readOnly/>
                        
                        <label>STOCK:</label>
                        <input type='number' placeholder='STOCK' readOnly/>

                        <label>VENDEDOR:</label>
                        <input type='text' placeholder='VENDEDOR' readOnly/>
                    </form>
                </div>

                <div className='container__buttons'>
                    <button type='submit'>GUARDAR</button>
                    <button type='submit'>CANCELAR</button>
                </div>
            </div>
        </main>
    );
}