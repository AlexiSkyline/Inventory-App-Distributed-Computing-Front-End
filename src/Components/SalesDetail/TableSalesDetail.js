import React from 'react';
import PropTypes from 'prop-types';

export const TableSalesDetail = ({ titles, listSalesDetail, handleResetSearchInput }) => {
    const handleUpdate = ( id ) => {}
    const handleConfirm = ( id ) => {}

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