export const ValidateProduct = ( values ) => {
    let errors = {};

    // * Validar el nombre del producto
    if( !values.name ) {
        errors.name = 'El nombre es obligatorio';
    } else if( values.name.length < 5 ) {
        errors.name = 'El nombre debe tener al menos 5 caracteres';
    } else if( values.name.length > 50 ) {
        errors.name = 'El nombre debe tener menos de 50 caracteres';
    }

    // * Validar la descripción del producto
    if( !values.description ) {
        errors.description = 'La descripción es obligatorio';
    } else if( values.description.length < 5 ) {
        errors.description = 'La descripción debe tener al menos 5 caracteres';
    } else if( values.description.length > 50 ) { 
        errors.description = 'La descripción debe tener menos de 50 caracteres';
    }

    // * Validar el precio del producto
    if( !values.price ) {
        errors.price = 'El precio es obligatorio';
    } else if( !/^[0-9]{1,10}$/i.test( values.price ) ) {
        errors.price = 'El precio no es valido';
    }

    // * Validar Id Unidad de medida del producto
    if( !values.idUnitMesurement ) {
        errors.idUnitMesurement = 'El ID de la unidad de medida es obligatorio';
    } else if( values.length < 36 ) {
        errors.idUnitMesurement = 'El ID de la unidad de medida debe tener al menos 36 caracteres';
    } else if( values.length > 36 ) {
        errors.idUnitMesurement = 'El ID de la unidad de medida debe tener menos de 36 caracteres';
    }

    // * Validar Id Marca del producto
    if( !values.idBrand ) {
        errors.idBrand = 'El ID de la marca es obligatorio';
    } else if( values.length < 36 ) {
        errors.idBrand = 'El ID de la marca debe tener al menos 36 caracteres';
    } else if( values.length > 36 ) {
        errors.idBrand = 'El ID de la marca debe tener menos de 36 caracteres';
    }

    // * Validar el stock del producto
    if( !values.stock ) {
        errors.stock = 'El stock es obligatorio';
    } else if( !/^[0-9]{1,10}$/i.test( values.stock ) ) {
        errors.stock = 'El stock no es valido';
    }

    // * Validar Id Marca del producto
    if( !values.idProvider ) {
        errors.idProvider = 'El ID del proveedor es obligatorio';
    } else if( values.length < 36 ) {
        errors.idProvider = 'El ID del proveedor debe tener al menos 36 caracteres';
    } else if( values.length > 36 ) {
        errors.idProvider = 'El ID del proveedor debe tener menos de 36 caracteres';
    }

    return errors;
}