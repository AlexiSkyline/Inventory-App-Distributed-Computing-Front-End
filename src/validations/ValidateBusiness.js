export const ValidateBusiness = ( values ) => {
    let errors = {};

    // * Validar el nomnre de la empresa
    if( !values.name ) {
        errors.name = 'El nombre de la empresa es requerido';
    } else if( values.name.length < 5 ) {
        errors.name = 'El nombre de la empresa debe tener al menos 5 caracteres';
    } else if( values.name.length > 50 ) {
        errors.name = 'El nombre de la empresa debe tener como maximo 50 caracteres';
    }

    if( !values.address ) { 
        errors.address = 'La dirección de la empresa es requerida';
    } else if( values.address.length < 5 ) {
        errors.address = 'La dirección de la empresa debe tener al menos 5 caracteres';
    } else if( values.address.length > 50 ) {
        errors.address = 'La dirección de la empresa debe tener como maximo 50 caracteres';
    }

    return errors;
}