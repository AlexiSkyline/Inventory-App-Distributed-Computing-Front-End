import { useState } from 'react';

export const useForm = ( initialState = {} ) => {
    const [ values, setValues ] = useState(initialState);

    const resetInputs = ( newFormState = initialState ) => {
        setValues( newFormState );
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    }

    return [ values, handleInputChange, resetInputs ];
}