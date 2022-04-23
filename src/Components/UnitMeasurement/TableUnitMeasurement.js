import React from 'react';
import PropTypes from 'prop-types';

export const TableUnitMeasurement = ({ unitMs, handleResetSearchInput }) => {
    return (
        <div className='table__container'>  
            <table className='table table__brands'> 
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
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='btn__delete'
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