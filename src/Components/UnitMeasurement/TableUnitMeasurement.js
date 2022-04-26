import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useActions } from '../../Hooks/useActions';

import { UnitMeasurementContext } from '../../Context/UnitMeasurement/UnitMeasurementContext';

export const TableUnitMeasurement = ({ unitMs, handleResetSearchInput }) => {
    const unitMeasurementContext = useContext( UnitMeasurementContext );
    const { deleteUnitM, activeModeEdit, modeSearchUnitMDesactive } = unitMeasurementContext;

    /*
        * Funcion para eliminar un unidad de medida una vez que se confirma
        * Recibe el id de la unidad de medida a eliminar
        * Luego elimina la unidad de medida
        * Luego desactiva el modo de busqueda si esta activo
        * Luego reinicia el input de busqueda de la unidad de medidas
    */
    const handleDelete = ( id ) => {
        deleteUnitM( id );
        handleResetSearchInput();
        modeSearchUnitMDesactive();
    }

    const [ handleConfirm, handleUpdate ] = useActions( 'La unidad de medida', handleDelete, activeModeEdit );

    return (
        <div className='table__container'>  
            <table className='table table__small'> 
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descripción</th>
                        <th>
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        unitMs.map( unitM => (
                            <tr 
                                key={ unitM.id }
                                className={ `${ unitM.id }` }
                            >
                                <td>{ unitM.id }</td>
                                <td>{ unitM.description.length > 15 ? unitM.description.substr( 0, 15 ) : unitM.description }</td>
                                <td>
                                    <button 
                                        className='btn__edit'
                                        onClick={ () => handleUpdate( unitM ) }
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='btn__delete'
                                        onClick={ () => handleConfirm( unitM.id ) }
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

TableUnitMeasurement.propTypes = {
    unitMs: PropTypes.array.isRequired,
    handleResetSearchInput: PropTypes.func.isRequired
}