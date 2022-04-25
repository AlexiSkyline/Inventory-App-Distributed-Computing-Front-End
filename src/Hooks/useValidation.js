import { useState, useEffect, useContext } from 'react';
import { ModeEditContext } from '../Context/ModeEdit/ModeEditContext';

export const useValidation = ( initialState, validate ) => {
    const modeEditContext = useContext( ModeEditContext );
    const { statusEditMode, editInfo } = modeEditContext;

    const [ formValues, setFormValues ] = useState( initialState );
    const [ errors, setErrors ] = useState({});
    const [ submitForm, setSubmitForm ] = useState( false );
    const [ isValid, setIsValid ] = useState( false );

    useEffect(() => {
        if( statusEditMode ) {
            setFormValues( editInfo );
        }
        // eslint-disable-next-line
    }, [ statusEditMode ]);

    useEffect(() => {
        if( submitForm ) {
            const noErrors = Object.keys( errors ).length === 0;

            if( noErrors ) {
                setIsValid( true ); // * Función que se ejecuta en el componente;
            }
            setSubmitForm( false );
        }
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

    const handleResetInput = () => {
        setFormValues( initialState );
    }

    return {
        formValues,
        errors,
        handleSubmit,
        handleInputChange,
        isValid,
        handleResetInput
    };
}