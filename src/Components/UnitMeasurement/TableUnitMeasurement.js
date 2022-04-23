import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { UnitMeasurementContext } from '../../Context/UnitMeasurement/UnitMeasurementContext';

export const TableUnitMeasurement = ({ unitMs, handleResetSearchInput }) => {
    const MySwal = withReactContent(Swal);

    const unitMeasurementContext = useContext( UnitMeasurementContext );
    const { deleteUnitM } = unitMeasurementContext;

    const handleDelete = ( id ) => {
        MySwal.fire({
            title: '¿Estas Seguro?',
            text: 'La unidad de medida se eliminará permanentemente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(( result) => {
            if( result.isConfirmed ) {
                deleteUnitM( id );
                MySwal.fire(
                   'Deleted!',
                   'La unidad de medida se eliminó correctamente',
                   'success'
                );
            }
        });
    }

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
                                        onClick={ () => handleDelete( unitM.id ) }
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