import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { SellerContext } from '../../Context/Seller/SellerContext';
import { useActions } from '../../Hooks/useActions';

export const TableSeller = ({ titles, listSeller, handleResetSearchInput }) => {
    const sellerContext = useContext( SellerContext );
    const { deleteSeller, activeModeEdit, disactiveSellerSearchMode  } = sellerContext;

    /*
        * Funcion para eliminar un vendedor una vez que se confirma
        * Recibe el id del vendedor a eliminar
        * Luego elimina el vendedor
        * Luego desactiva el modo de busqueda si esta activo
        * Luego reinicia el input de busqueda de vendedores
    */
    const handleDelete = ( id ) => {
        deleteSeller( id );
        handleResetSearchInput();
        disactiveSellerSearchMode();
    }

    // * Hook para confirmar la eliminacion o actualizacion de un vendedor
    const [ handleConfirm, handleUpdate ] = useActions( 'El vendedor', handleDelete, activeModeEdit );

    return (
        <div className='table__container table__median'>  
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
                        listSeller.map( seller => (
                            <tr 
                                key={ seller.id }
                                className={ `${ seller.id }` }
                            >
                                <td>{ seller.id.split('-')[0] }</td>
                                <td>{ seller.name }</td>
                                <td>{ seller.lastName }</td>
                                <td>{ seller.rfc }</td>
                                <td>{ seller.address }</td>
                                <td>{ seller.email }</td>
                                <td>{ seller.phoneNumber }</td>
                                <td>{ seller.userName }</td>
                                <td>
                                    <button 
                                        className='btn__edit'
                                        onClick={ () => handleUpdate( seller ) }
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='btn__delete'
                                        onClick={ () => handleConfirm( seller.id ) }
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

TableSeller.propTypes = {
    titles: PropTypes.array.isRequired,
    listSeller: PropTypes.array.isRequired,
    handleResetSearchInput: PropTypes.func.isRequired
}