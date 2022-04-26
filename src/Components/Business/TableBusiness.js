import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useActions } from '../../Hooks/useActions';

import { BusinessContext } from '../../Context/Business/BusinessContext';

export const TableBusiness = ({ business, handleResetSearchInput  }) => {
    const businessContext = useContext( BusinessContext );
    const { deleteBusiness, activeModeEdit, modeSearchBusinessDesactive } = businessContext;
    
    /*
        * Funcion para eliminar un empresa una vez que se confirma
        * Recibe el id del empresa a eliminar
        * Luego elimina el empresa
        * Luego desactiva el modo de busqueda si esta activo
        * Luego reinicia el input de busqueda de empresas
    */
    const handleDelete = ( id ) => {
        deleteBusiness( id );
        handleResetSearchInput();
        modeSearchBusinessDesactive();
    }

    const [ handleConfirm, handleUpdate ] = useActions( 'La empresa', handleDelete, activeModeEdit );

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
                                        onClick={ () => handleConfirm( busines.id ) }
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