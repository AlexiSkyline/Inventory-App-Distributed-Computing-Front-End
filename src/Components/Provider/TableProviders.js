import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useActions } from '../../Hooks/useActions';

import { ProviderContext } from '../../Context/Provider/ProviderContext';

export const TableProviders = ({ titles, listProviders, handleResetSearchInput }) => {
    const providerContext = useContext( ProviderContext );
    const { deleteProvider, activeModeEdit, disactiveProviderSearchMode } = providerContext;

    /*
        * Funcion para eliminar una proveedor una vez que se confirma
        * Recibe el id de la proveedor a eliminar
        * Luego elimina la proveedor
        * Luego desactiva el modo de busqueda si esta activo
        * Luego reinicia el input de busqueda de la proveedor
    */
    const handleDelete = ( id ) => {
        deleteProvider( id );
        handleResetSearchInput();
        disactiveProviderSearchMode();
    }

    // * Hook para confirmar la eliminacion o actualizacion de una proveedor
    const [ handleConfirm, handleUpdate ] = useActions( 'El proveedor', handleDelete, activeModeEdit );

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
                        listProviders.map( provider => (
                            <tr 
                                key={ provider.id }
                                className={ `${ provider.id }` }
                            >
                                <td>{ provider.id.split('-')[0] }</td>
                                <td>{ provider.name }</td>
                                <td>{ provider.lastName }</td>
                                <td>{ provider.rfc }</td>
                                <td>{ provider.address }</td>
                                <td>{ provider.email }</td>
                                <td>{ provider.phoneNumber }</td>
                                <td>
                                    <button 
                                        className='btn__edit'
                                        onClick={ () => handleUpdate( provider ) }
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='btn__delete'
                                        onClick={ () => handleConfirm( provider.id ) }
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

TableProviders.propTypes = {
    titles: PropTypes.array.isRequired,
    listProviders: PropTypes.array.isRequired,
    handleResetSearchInput: PropTypes.func.isRequired
}