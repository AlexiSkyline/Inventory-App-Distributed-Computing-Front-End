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
                {
                    products.map( product => (
                        <tr 
                            key={ product.id }
                            className={ `${ product.id }` }
                        >
                            <td>{ product.id.split('-')[0] }</td>
                            <td>{ product.name }</td>
                            <td>{ product.brand }</td>
                            <td>{ product.description.length > 15 ? product.description.substr( 0, 15 ) : product.description }</td>
                            <td>{ `$${ product.price}` }</td>
                            <td>{ product.unitMesurement }</td>
                            <td>{ product.stock }</td>
                            <td>{ product.provider.length > 10 ? product.provider.substr( 0, 8 ) : product.provider }...</td>
                            <td>
                                <button className='btn__edit'>Editar</button>
                                <button className='btn__delete'>Eliminar</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}