import React from 'react'

export const TableProducts = ({ titles , products }) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    {
                        titles.map( ( title, index ) => <th key={ index }>{ title }</th> )
                    }
                    <th>
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>90a9fad5</td>
                    <td>Doritos</td>
                    <td>Pizza</td>
                    <td>$8.5</td>
                    <td>Piezas</td>
                    <td>Sabritas</td>
                    <td>95</td>
                    <td>
                        <button className='btn__edit'>Editar</button>
                        <button className='btn__delete'>Eliminar</button>
                    </td>
                </tr>
                <tr>
                    <td>90a9fad5</td>
                    <td>Doritos</td>
                    <td>Pizza</td>
                    <td>$8.5</td>
                    <td>Piezas</td>
                    <td>Sabritas</td>
                    <td>95</td>
                    <td>
                        <button className='btn__edit'>Editar</button>
                        <button className='btn__delete'>Eliminar</button>
                    </td>
                </tr>
                <tr>
                    <td>90a9fad5</td>
                    <td>Doritos</td>
                    <td>Pizza</td>
                    <td>$8.5</td>
                    <td>Piezas</td>
                    <td>Sabritas</td>
                    <td>95</td>
                    <td>
                        <button className='btn__edit'>Editar</button>
                        <button className='btn__delete'>Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}