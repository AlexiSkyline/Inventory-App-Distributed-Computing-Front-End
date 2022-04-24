import React from 'react';
import PropTypes from 'prop-types';

export const TableBusiness = ({ business, handleResetSearchInput  }) => {

    const handleDelete = ( id ) => {
        handleResetSearchInput();
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