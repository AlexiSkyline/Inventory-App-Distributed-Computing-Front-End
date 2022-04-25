export const ValidateClient = ( values ) => {
    let errors = {};

    // * Validar el nombre de Cliente
    if( !values.name ) {
        errors.name = 'El nombre es obligatorio';
    } else if( values.name.length < 5 ) {
        errors.name = 'El nombre debe tener al menos 5 caracteres';
    } else if( values.name.length > 50 ) {
        errors.name = 'El nombre debe tener menos de 50 caracteres';
    }

    // * Validar el apellido des Cliente
    if( !values.lastName ) {
        errors.lastName = 'Los apellidos son obligatorios';
    } else if( values.lastName.length < 5 ) {
        errors.lastName = 'Los apellidos debe tener al menos 5 caracteres';
    } else if( values.lastName.length > 100 ) {
        errors.lastName = 'Los apellidos debe tener menos de 1000 caracteres';
    }

    // * Validar el rfc de Cliente
    if( !values.rfc ) {
        errors.rfc = 'El RFC es obligatorios';
    } else if( values.rfc.length !== 13 ) {
        errors.rfc = 'El RFC debe tener 13 caracteres';
    }
    
    // * Validar la dirección de Cliente
    if( !values.address ) {
        errors.address = 'La dirección es obligatorios';
    } else if( values.address.length < 5 ) {
        errors.address = 'Las dirección debe tener al menos 5 caracteres';
    } else if( values.address.length > 200 ) {
        errors.address = 'Las dirección debe tener menos de 200 caracteres';
    }

    // * Validar el email
    if( !values.email ) {
        errors.email = 'El email es Obligatoria';
    } else if( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test( values.email ) ) {
        errors.email = 'Email o válido';
    }

    // * Validar el numero de telefono
    if( !values.phoneNumber ) {
        errors.phoneNumber = 'El numero de telefono es obligatorio';
    } else if( values.phoneNumber.length < 10 ) {
        errors.phoneNumber = 'El numero de telefono debe tener al menos 10 caracteres';
    } else if( values.phoneNumber.length > 10 ) {
        errors.phoneNumber = 'El numero de telefono debe tener menos de 10 caracteres';
    } else if( !/^[0-9]{10}$/i.test( values.phoneNumber ) ) {
        errors.phoneNumber = 'El numero de telefono no es valido';
    }

    return errors;
}