import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { BrandContext } from '../../Context/Brand/BrandContext';

export const TableBrands = ({ titles , brands }) => {
    const MySwal = withReactContent(Swal);

    const brandContext = useContext( BrandContext );
    const { deleteBrand, message } = brandContext;
    
    /*
        * Funcion para eliminar un producto
        * Recibe el id del producto a eliminar
        * Luego pregunta si desea eliminarlo
        * Luego elimina el producto
        * Luego desactiva el modo de busqueda si esta activo
        * Luego reinicia el input de busqueda de productos
    */
    const handleDelete = ( id ) => { 
        MySwal.fire({
            title: '¿Estas Seguro?',
            text: 'El producto se eliminará permanentemente',
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
            }
        });
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