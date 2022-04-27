import React from 'react';
import PropTypes from 'prop-types';

export const TableSeller = ({ titles, listSeller, handleResetSearchInput }) => {
    
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
                        listSeller.map( seller => (
                            <tr 
                                key={ seller.id }
                                className={ `${ seller.id }` }
                            >
                                <td>{ seller.id.split('-')[0] }</td>
                                <td>{ seller.name }</td>
                                <td>{ seller.lastName }</td>
                                <td>{ seller.rfc }</td>
                                <td>{ seller.address }</td>
                                <td>{ seller.email }</td>
                                <td>{ seller.phoneNumber }</td>
                                <td>{ seller.userName }</td>
                                <td>
                                    <button 
                                        className='btn__edit'
                                        onClick={ () => handleUpdate( seller ) }
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='btn__delete'
                                        onClick={ () => handleConfirm( seller.id ) }
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

TableSeller.propTypes = {
    titles: PropTypes.array.isRequired,
    listSeller: PropTypes.array.isRequired,
    handleResetSearchInput: PropTypes.func.isRequired
}