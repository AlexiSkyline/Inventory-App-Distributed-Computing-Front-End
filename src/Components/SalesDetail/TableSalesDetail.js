import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { SalesDetailContext } from '../../Context/SalesDetail/SalesDetailContext';
import { useActions } from '../../Hooks/useActions';

export const TableSalesDetail = ({ titles, listSalesDetail, handleResetSearchInput }) => {
    const salesDetailContext = useContext( SalesDetailContext );
    const { deleteSalesDetail, activeModeEdit, disactiveSalesDetailSearchMode } = salesDetailContext;

    /*
        * Funcion para eliminar un detalle Ventas una vez que se confirma
        * Recibe el id del detalle Ventas a eliminar
        * Luego elimina el detalle Ventas
        * Luego desactiva el modo de busqueda si esta activo
        * Luego reinicia el input de busqueda de detalle Ventas
    */
    const handleDelete = ( id ) => {
        deleteSalesDetail( id );
        handleResetSearchInput();
        disactiveSalesDetailSearchMode();
    }

    const [ handleConfirm, handleUpdate ] = useActions( 'El detalle de la venta', handleDelete, activeModeEdit );
    
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
                        listSalesDetail.map( salesDetail => (
                            <tr 
                                key={ salesDetail.id }
                                className={ `${ salesDetail.id }` }
                            >
                                <td>{ salesDetail.id.split('-')[0] }</td>
                                <td>{ salesDetail.folio }</td>
                                <td>{ salesDetail.product }</td>
                                <td>{ salesDetail.amountProduct }</td>
                                <td>{ `$${ salesDetail.purchasePrice }` }</td>
                                <td>{ `$${ salesDetail.amount }` }</td>
                                <td>{ salesDetail.date.split('T')[0] }</td>
                                <td>
                                    <button 
                                        className='btn__edit'
                                        onClick={ () => handleUpdate( salesDetail ) }
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='btn__delete'
                                        onClick={ () => handleConfirm( salesDetail.id ) }
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

TableSalesDetail.propTypes = {
    titles: PropTypes.array.isRequired,
    listSalesDetail: PropTypes.array.isRequired,
    handleResetSearchInput: PropTypes.func.isRequired
}