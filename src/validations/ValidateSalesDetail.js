export const ValidateSalesDetail = ( values ) => {
    let errors = {};

    // * Validar el ID de la venta
    if( !values.idSale ) {
        errors.idSale = 'El ID de la venta es requerido';
    } else if( values.length > 40 ) {
        errors.idSale = 'El ID de la venta debe tener como maximo 40 caracteres';
    } else if( values.length < 30 ) {
        errors.idSale = 'El ID de la venta debe tener al menos 30 caracteres';
    }

    // * Validar el ID del producto
    if( !values.idProduct ) {
        errors.idProduct = 'El ID del producto es requerido';
    } else if( values.length > 40 ) {
        errors.idProduct = 'El ID del producto debe tener como maximo 40 caracteres';
    } else if( values.length < 30 ) {
        errors.idProduct = 'El ID del producto debe tener al menos 30 caracteres';
    }

    // * Validar la cantidad de productos
    if( !values.amountProduct ) {
        errors.amountProduct = 'La cantidad de productos es requerida';
    } else if( !/^[0-9]{1,10}$/i.test( values.amountProduct ) ) {
        errors.amountProduct = 'La cantidad de productos debe ser un numero entero';
    } 

    // * Validar el precio unitario
    if( !values.purchasePrice ) {
        errors.purchasePrice = 'El precio unitario es requerido';
    } else if( isNaN( values.purchasePrice ) ) {
        errors.purchasePrice = 'El precio unitario debe ser un numero';
    }

    // * Validar el precio total
    if( !values.amount ) {
        errors.amount = 'El precio total es requerido';
    } else if( isNaN( values.amount ) ) {
        errors.amount = 'El precio total debe ser un numero';
    }
    
    return errors;
}