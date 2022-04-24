import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ClientContext } from '../../Context/Client/ClientContext';

export const TableClients = ({ listClients, handleResetSearchInput }) => {
    const clientContext = useContext( ClientContext );
    const { deleteClient, activeModeEdit, disactiveClientEditingMode } = clientContext;

    const handleDelete = ( id ) => {

    }
    /*
        * Funcion para abrir el modal de editar una Cliente
        * Recibe todo los datos del Cliente a editar
        * Abri el modal
        * Luego activa el modo de edicion
    */
    const handleUpdate = ( client ) => {
        
    }

    return (
        <div className='table__container'>  
            <table className='table'> 
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>RFC</th>
                        <th>Dirección</th>
                        <th>Email</th>
                        <th>Número de Telefono</th>
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
                                        onClick={ () => handleDelete( client.id ) }
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
    listClients: PropTypes.array.isRequired,
    handleResetSearchInput: PropTypes.func.isRequired
}