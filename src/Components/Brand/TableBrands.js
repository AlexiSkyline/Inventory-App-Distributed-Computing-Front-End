import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BrandContext } from '../../Context/Brand/BrandContext';
import { ModalContext } from '../../Context/Modal/ModalContext';

export const TableBrands = ({ titles , brands, handleResetSearchInput }) => {
    const MySwal = withReactContent(Swal);

    const brandContext = useContext( BrandContext );
    const { deleteBrand, activeModeEdit, modeSearchBrandDesactive } = brandContext;

    const modalContext = useContext( ModalContext );
    const { uiOpenModal } = modalContext;
    
    /*
        * Funcion para eliminar una marca
        * Recibe el id de la marca a eliminar
        * Luego pregunta si desea eliminarlo
        * Luego elimina la marca
        * Luego desactiva el modo de busqueda si esta activo
        * Luego reinicia el input de busqueda de la marca
    */
    const handleDelete = ( id ) => { 
        MySwal.fire({
            title: '¿Estas Seguro?',
            text: 'La marca se eliminará permanentemente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(( result) => {
            if( result.isConfirmed ) {
                deleteBrand( id );
                MySwal.fire(
                   'Deleted!',
                   'La marca se eliminó correctamente',
                   'success'
                );
                modeSearchBrandDesactive();
                handleResetSearchInput();
            }
        });
    }

    /*
        * Funcion para abrir el modal de editar una marca
        * Recibe todo la marca a editar
        * Abri el modal
        * Luego activa el modo de edicion
    */
    const handleUpdate = ( brand ) => {
        uiOpenModal();
        activeModeEdit( brand );
    }

    return (
        <div className='table__container'>  
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
                                        onClick={ () => handleUpdate( brand ) }
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='btn__delete'
                                        onClick={ () => handleDelete( brand.id ) }
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