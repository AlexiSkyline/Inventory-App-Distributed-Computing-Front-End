import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { SalesContext } from '../../Context/Sales/SalesContext';
import { useActions } from '../../Hooks/useActions';

export const TableSales = ({ titles, listSales, handleResetSearchInput }) => {
    const salesContext = useContext( SalesContext );
    const { deleteSales, activeModeEdit, disactiveSalesSearchMode } = salesContext;
    
     /*
        * Funcion para eliminar una Ventas una vez que se confirma
        * Recibe el id de la Ventas a eliminar
        * Luego elimina la Ventas
        * Luego desactiva el modo de busqueda si esta activo
        * Luego reinicia el input de busqueda de la Venta
    */
     const handleDelete = ( id ) => {
        deleteSales( id );
        handleResetSearchInput();
        disactiveSalesSearchMode();
    }

    const [ handleConfirm, handleUpdate ] = useActions( 'La venta', handleDelete, activeModeEdit );

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
                        listSales.map( sales => (
                            <tr 
                                key={ sales.id }
                                className={ `${ sales.id }` }
                            >
                                <td>{ sales.id.split('-')[0] }</td>
                                <td>{ sales.seller }</td>
                                <td>{ sales.client }</td>
                                <td>{ sales.folio }</td>
                                <td>{ sales.business }</td>
                                <td>{ `$${ sales.total }` }</td>
                                <td>{ `$${ sales.iva }` }</td>
                                <td>{ `$${ sales.subTotal }` }</td>
                                <td>{ sales.paymentType }</td>
                                <td>{ sales.date.split('T')[0] }</td>
                                <td>
                                    <button 
                                        className='btn__edit'
                                        onClick={ () => handleUpdate( sales ) }
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='btn__delete'
                                        onClick={ () => handleConfirm( sales.id ) }
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

TableSales.propTypes = {
    titles: PropTypes.array.isRequired,
    listSales: PropTypes.array.isRequired,
    handleResetSearchInput: PropTypes.func.isRequired
}