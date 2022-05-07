import React from 'react'

export const SalesForm = () => {
    return (
        <div className='container__forms'>
            <form className='form__input'>
                <label>ID CLIENTE:</label>
                <input type='text' placeholder='ID CLIENTE' />
                <button
                    className='btn__search'
                >
                    BUSCAR C
                </button>

                <label>ID PRODUCTO:</label>
                <input type='text' placeholder='ID PRODUCTO' />
                <button
                    className='btn__search'
                >
                    BUSCAR P
                </button>

                <label>PRECIO:</label>
                <input type='number' placeholder='PRECIO' readOnly/>
                <button
                    className='btn__add'
                >
                    AGREGAR P
                </button>

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
    );
}