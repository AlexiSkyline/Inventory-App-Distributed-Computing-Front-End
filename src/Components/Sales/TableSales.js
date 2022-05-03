import React from 'react';
import PropTypes from 'prop-types';

export const TableSales = ({ titles, listSales, handleResetSearchInput }) => {
    const handleUpdate = () => {}
    const handleConfirm = () => {}

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