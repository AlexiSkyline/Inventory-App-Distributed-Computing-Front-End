import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useActions } from '../../Hooks/useActions';

import { BrandContext } from '../../Context/Brand/BrandContext';

export const TableBrands = ({ titles , brands, handleResetSearchInput }) => {
    const brandContext = useContext( BrandContext );
    const { deleteBrand, activeModeEdit, modeSearchBrandDesactive } = brandContext;
    
    /*
        * Funcion para eliminar una marca una vez que se confirma
        * Recibe el id de la marca a eliminar
        * Luego elimina la marca
        * Luego desactiva el modo de busqueda si esta activo
        * Luego reinicia el input de busqueda de la marca
    */
    const handleDelete = ( id ) => { 
        deleteBrand( id );
        modeSearchBrandDesactive();
        handleResetSearchInput();
    }
    
    const [ handleConfirm, handleUpdate ] = useActions( 'La marca', handleDelete, activeModeEdit );
    

    return (
        <div className='table__container'>  
            <table className='table table__small'> 
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
                                        onClick={ () => handleUpdate( brand ) }
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='btn__delete'
                                        onClick={ () => handleConfirm( brand.id ) }
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

TableBrands.prototype = {
    titles: PropTypes.array.isRequired,
    brands: PropTypes.array.isRequired,
    handleResetSearchInput: PropTypes.func.isRequired
}