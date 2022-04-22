import React from 'react'

export const TableBrands = ({ titles , brands }) => {
    return (
        <>  
            <table className='table table__brands'> 
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
                        brands.map( brand => (
                            <tr 
                                key={ brand.id }
                                className={ `${ brand.id }` }
                            >
                                <td>{ brand.id }</td>
                                <td>{ brand.description.length > 15 ? brand.description.substr( 0, 15 ) : brand.description }</td>
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
        </>
    );
}