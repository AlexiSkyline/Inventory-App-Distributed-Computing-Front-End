export const ValidateUnitMeasurement = ( values ) => {
    let errors = {};

    // * Validar la descripcion de la unidad de medida
    if( !values.description ) {
        errors.description = 'La descripcion es obligatoria';
    } else if( values.description.length < 5 ) {
        errors.description = 'La descripcion debe tener al menos 5 caracteres';
    } else if( values.description.length > 50 ) { 
        errors.description = 'La descripcion debe tener menos de 50 caracteres';
    }

    return errors;
}