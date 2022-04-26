import React, { useContext } from 'react';
import PropTypes from 'prop-types';

export const TableProviders = ({ listProviders, handleResetSearchInput }) => {
    return (
        <div className='table__container table__median'>  
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
                                        // onClick={ () => handleUpdate( provider ) }
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='btn__delete'
                                        // onClick={ () => handleDelete( provider.id ) }
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
    listProviders: PropTypes.array.isRequired,
    handleResetSearchInput: PropTypes.func.isRequired
}