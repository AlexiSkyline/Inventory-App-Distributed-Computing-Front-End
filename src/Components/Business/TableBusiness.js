import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { BusinessContext } from '../../Context/Business/BusinessContext';

export const TableBusiness = ({ business, handleResetSearchInput  }) => {
    const MySwal = withReactContent(Swal);

    const businessContext = useContext( BusinessContext );
    const { deleteBusiness } = businessContext;
    
    const handleDelete = ( id ) => {
        MySwal.fire({
            title: '¿Estas Seguro?',
            text: 'La empresa se eliminará permanentemente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(( result) => {
            if( result.isConfirmed ) {
                deleteBusiness( id );
                MySwal.fire(
                   'Deleted!',
                   'La empresa se eliminó correctamente',
                   'success'
                );
                handleResetSearchInput();
            }
        });
    }

    /*
        * Funcion para abrir el modal de editar una empresa
        * Recibe todo la empresa a editar
        * Abri el modal
        * Luego activa el modo de edicion
    */
    const handleUpdate = ( busines ) => {
        
    }

    return (
        <div className='table__container'>  
            <table className='table table__brands'> 
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        business.map( busines => (
                            <tr 
                                key={ busines.id }
                                className={ `${ busines.id }` }
                            >
                                <td>{ busines.id }</td>
                                <td>{ busines.name }</td>
                                <td>{ busines.address.length > 15 ? busines.address.substr( 0, 15 ) : busines.address }</td>
                                <td>
                                    <button 
                                        className='btn__edit'
                                        onClick={ () => handleUpdate( busines ) }
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='btn__delete'
                                        onClick={ () => handleDelete( busines.id ) }
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

TableBusiness.propTypes = {
    business: PropTypes.array.isRequired,
    handleResetSearchInput: PropTypes.func.isRequired
}