import React, { useContext } from 'react';
import { NewSaleContext } from '../../Context/NewSale/NewSaleContext';

export const TableProduct = () => {
    const newSalesContext = useContext( NewSaleContext );
    const { cart, removeCart } = newSalesContext;

    return (
        <div className='table__container table__sale'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>PRODUCTO</th>
                        <th>CANTIDAD</th>
                        <th>PRECIO U</th>
                        <th>TOTAL</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        cart.map( (product, index = 1 ) => (
                            <tr
                                key={ index }
                            >
                                <td>{ index + 1 }</td>
                                <td>{ product.idProduct.split('-')[0] }</td>
                                <td>{ product.product }</td>
                                <td>{ product.amountProduct }</td>
                                <td>{ `$${ product.purchasePrice }` }</td>
                                <td>{ `$${ product.purchasePrice * product.amountProduct }` }</td>
                                <td>
                                    <button 
                                        className='btn__delete'
                                        onClick={ () => removeCart( product.idProduct ) }
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}