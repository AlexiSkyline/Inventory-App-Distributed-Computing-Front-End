import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useActions } from '../../Hooks/useActions';

import { ClientContext } from '../../Context/Client/ClientContext';

export const TableClients = ({ titles, listClients, handleResetSearchInput }) => {
    const clientContext = useContext( ClientContext );
    const { deleteClient, activeModeEdit, disactiveClientSearchMode } = clientContext;

    /*
        * Funcion para eliminar un cliente una vez que se confirma
        * Recibe el id del cliente a eliminar
        * Luego elimina el cliente
        * Luego desactiva el modo de busqueda si esta activo
        * Luego reinicia el input de busqueda de clientes
    */
    const handleDelete = ( id ) => {
        deleteClient( id );
        handleResetSearchInput();
        disactiveClientSearchMode();
    }

    const [ handleConfirm, handleUpdate ] = useActions( 'El cliente', handleDelete, activeModeEdit );

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
                        listClients.map( client => (
                            <tr 
                                key={ client.id }
                                className={ `${ client.id }` }
                            >
                                <td>{ client.id.split('-')[0] }</td>
                                <td>{ client.name }</td>
                                <td>{ client.lastName }</td>
                                <td>{ client.rfc }</td>
                                <td>{ client.address }</td>
                                <td>{ client.email }</td>
                                <td>{ client.phoneNumber }</td>
                                <td>
                                    <button 
                                        className='btn__edit'
                                        onClick={ () => handleUpdate( client ) }
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='btn__delete'
                                        onClick={ () => handleConfirm( client.id ) }
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

TableClients.propTypes = {
    titles: PropTypes.array.isRequired,
    listClients: PropTypes.array.isRequired,
    handleResetSearchInput: PropTypes.func.isRequired
}