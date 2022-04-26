import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ProviderContext } from '../../Context/Provider/ProviderContext';

export const TableProviders = ({ listProviders, handleResetSearchInput }) => {
    const MySwal = withReactContent(Swal);

    const providerContext = useContext( ProviderContext );
    const { deleteProvider, activeModeEdit, desactiveModeEdit } = providerContext;

    const handleDelete = ( id ) => {
        MySwal.fire({
            title: '¿Estas Seguro?',
            text: 'El proveedor se eliminará permanentemente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(( result) => {
            if( result.isConfirmed ) {
                deleteProvider( id );
                MySwal.fire(
                   'Deleted!',
                   'El proveedor se eliminó correctamente',
                   'success'
                );
                handleResetSearchInput();
            }
        });
    }

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
                                        onClick={ () => handleDelete( provider.id ) }
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