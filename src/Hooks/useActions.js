import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { ModalContext } from '../Context/Modal/ModalContext';

/*
    * Este hook es para realizar las acciones de eliminar o editar
    * @param {string} title - Titulo del modal
    * @param {function} handleDelete - Función que se va a ejecutar en el componente en caso de eliminar
    * @param {function} activeModeEdit - Función para activar el modo de edición
    * @returns handleDelete, handleEdit
*/
export const useActions = ( title, handleDelete, activeModeEdit ) => {
    const MySwal = withReactContent(Swal);

    const modalContext = useContext( ModalContext );
    const { uiOpenModal } = modalContext;

    const [ confirm, setConfirm ] = useState(false);
    const [ id, setId ] = useState('');

    /*
        * En esta parte verificamos siempre que es estado de confir cambie
        * Si cambia y esta es true entonces ejecutamos la funcion para eliminar
        * Luego cambiamos el estado de confirm a false
    */
    useEffect(() => {
        if( confirm ) {
            handleDelete( id );
            setConfirm( false );
        }
        // eslint-disable-next-line
    }, [confirm]);

    /*
        * Funcion para abrir el modal de confirmación
        * Recibe el id de lo que se va a eliminar
        * Luego abre el modal
        * pregunta si se desea eliminar
        * Si confirma que se desa eliminar cambia el estado de confirm a true
        * Luego pasamos el Id de lo que se desa eliminar al state de id
    */
    const handleConfirm = ( id ) => {
        MySwal.fire({
            title: '¿Estas Seguro?',
            text: `${ title } se eliminará permanentemente`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(( result) => {
            if( result.isConfirmed ) {
                setConfirm( true );
                setId( id );
                MySwal.fire(
                   'Deleted!',
                   `${ title } se eliminó correctamente`,
                   'success'
                );
            }
        });
    }

     /*
        * Funcion para abrir el modal de editar cuando se hace click en el boton editar
        * Recibe la información de lo que se va a editar
        * Luego abre el modal
        * Luego ejecuta la función de activar el modo de edición
    */
    const handleUpdate = ( data ) => {
        uiOpenModal();
        activeModeEdit( data );
    }
    
    return [ handleConfirm, handleUpdate ];
}