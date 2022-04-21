import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ModalContext } from '../../Context/Modal/ModalContext';
import { ProductContext } from '../../Context/Product/ProductContext';

export const TableProducts = ({ titles , products, handleResetInput }) => {
    const MySwal = withReactContent(Swal)

    const productContext = useContext( ProductContext );
    const { deleteProduct, message, activeModeEdit, modeSearchProductDesactive } = productContext;

    const modalContext = useContext( ModalContext );
    const { uiOpenModal } = modalContext;

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
                deleteProduct( id );
                MySwal.fire(
                  'Deleted!',
                   message,
                  'success'
                );
                modeSearchProductDesactive();
                handleResetInput();
            }
        });
    }

    /*
        * Funcion para abrir el modal de editar un producto
        * Recibe todo el producto a editar
        * Abri el modal
        * Luego activa el modo de edicion
    */
    const handleUpdate = ( product ) => {
        uiOpenModal();
        activeModeEdit( product );
    }

    return (
        <>  
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
                        products.map( product => (
                            <tr 
                                key={ product.id }
                                className={ `${ product.id }` }
                            >
                                <td>{ product.id.split('-')[0] }</td>
                                <td>{ product.name }</td>
                                <td>{ product.brand }</td>
                                <td>{ product.description.length > 15 ? product.description.substr( 0, 15 ) : product.description }</td>
                                <td>{ `$${ product.price}` }</td>
                                <td>{ product.unitMesurement }</td>
                                <td>{ product.stock }</td>
                                <td>{ product.provider.length > 10 ? product.provider.substr( 0, 8 ) : product.provider }...</td>
                                <td>
                                    <button 
                                        className='btn__edit'
                                        onClick={ () => handleUpdate( product ) }
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        className='btn__delete'
                                        onClick={ () => handleDelete( product.id ) }
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