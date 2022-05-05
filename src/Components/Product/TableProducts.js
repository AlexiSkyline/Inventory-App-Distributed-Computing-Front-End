import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useActions } from '../../Hooks/useActions';

import { ProductContext } from '../../Context/Product/ProductContext';

export const TableProducts = ({ titles , products, handleResetSearchInput }) => {
    const productContext = useContext( ProductContext );
    const { deleteProduct, activeModeEdit, modeSearchProductDesactive } = productContext;

    /*
        * Funcion para eliminar un producto
        * Recibe el id del producto a eliminar
        * Luego elimina el producto
        * Luego desactiva el modo de busqueda si esta activo
        * Luego reinicia el input de busqueda de productos
    */
    const handleDelete = ( id ) => {
        deleteProduct( id );
        modeSearchProductDesactive();
        handleResetSearchInput();
    }

    // * Hook para confirmar la eliminacion o actualizacion de un producto
    const [ handleConfirm, handleUpdate ] = useActions( 'La producto', handleDelete, activeModeEdit );

    return (
        <div className='table__container'>  
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
                                    <button 
                                        className='btn__edit'
                                        onClick={ () => handleUpdate( product ) }
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='btn__delete'
                                        onClick={ () => handleConfirm( product.id ) }
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

TableProducts.prototype = { 
    titles: PropTypes.array.isRequired,
    products: PropTypes.array.isRequired,
    handleResetSearchInput: PropTypes.func.isRequired
}