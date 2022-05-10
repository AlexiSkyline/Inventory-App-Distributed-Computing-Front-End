export const ValidateLogin = ( values ) => {
    let errors = {};

    if( !values.username ) {
        errors.username = 'El nombre de usuario es requerido';
    } else if( values.username.length < 5 ) {
        errors.username = 'El nombre de usuario debe tener al menos 5 caracteres';
    } else if( values.username.length > 20 ) {
        errors.username = 'El nombre de usuario debe tener un máximo de 20 caracteres';
    }

    if( !values.password ) {
        errors.password = 'La contraseña es requerida';
    } else if( values.password.length < 6 ) {
        errors.password = 'La contraseña debe tener un minimo de 6 caracteres';
    } else if( values.password.length > 20 ) {
        errors.password = 'La contraseña debe tener un máximo de 20 caracteres';
    }

    return errors;
}