import { useState, useEffect, useContext } from 'react';
import { ModeEditContext } from '../Context/ModeEdit/ModeEditContext';
import { AlertContext } from '../Context/Alert/AlertContext';

/*
    * Este hook es para verificar si hay errores en el formulario
    * @param {object} initialState - Objeto con los valores iniciales del formulario 
    * @param {object} validate - Objeto con las validaciones del formulario 
    * @returns formValues, handleSubmit, handleInputChange, isValid
*/
export const useValidation = ( initialState, validate, fn, onlyReset = {} ) => {
    const modeEditContext = useContext( ModeEditContext );
    const { statusEditMode, editInfo } = modeEditContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    const [ formValues, setFormValues ] = useState( initialState );
    const [ errors, setErrors ] = useState({});
    const [ submitForm, setSubmitForm ] = useState( false );

    /*
        * En esta parte verificamos si hay algun objeto a editar
        * Si hay un objeto a editar, entonces le pasamos los datos al formulario
        * Si no hay un objeto a editar, entonces le pasamos los valores vacios al formulario 
    */
    useEffect(() => {
        if( statusEditMode ) {
            setFormValues( editInfo );
        } else {
            setFormValues( initialState );
        }
        // eslint-disable-next-line
    }, [ statusEditMode ]);

    // Todo: Funcion para reiniciar el formulario una vez que se haya enviado
    const handleResetInput = () => {
        setFormValues( initialState );
        
    }

    const handleResetInputIgnore = ( ignore ) => {
        setFormValues({ ...formValues, ...ignore });
    }
    
    /*
        * En esta parte verificamos si no hay errores en el formulario 
    */
    useEffect(() => {
        if( submitForm ) {
            const noErrors = Object.keys( errors ).length === 0;

            if( noErrors ) {
                fn(); // * Función que se ejecuta en el componente;
                if( Object.keys( onlyReset ).length === 0 ) {
                    handleResetInput();
                } else {
                    handleResetInputIgnore( onlyReset );
                }
                setErrors({});
            }
            setSubmitForm( false );
        }
       // eslint-disable-next-line 
    }, [errors]);

    // Todo: Función que se ejecuta conforme el usuario escribe algo
    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    } 

    // Todo: Función se ejecuta cuando hay un submit
    const handleSubmit = (e) => {   
        e.preventDefault();
        const errorsValidate = validate( formValues );
        setErrors( errorsValidate );
        setSubmitForm( true );
    }

    //* En esta parte verificamos si tenemos errores que mostrar
    useEffect(() => {
        if( Object.values(errors)[0] ) {
            showAlert( Object.values(errors)[0], 'alert-error' );
        }
        // eslint-disable-next-line
    }, [errors]);

    return [ formValues, handleSubmit, handleInputChange, handleResetInput ];
}