export const ValidateSalesDetail = ( values ) => {
    let errors = {};

    // * Validar el ID de la venta
    if( !values.idSale ) {
        errors.idSale = 'El ID de la venta es requerido';
    } else if( !values.idSale.length > 36 ) {
        errors.idSale = 'El ID de la venta debe tener como maximo 36 caracteres';
    } else if( !values.idSale.length < 36 ) {
        errors.idSale = 'El ID de la venta debe tener al menos 36 caracteres';
    }

    // * Validar el ID del producto
    if( !values.idProduct ) {
        errors.idProduct = 'El ID del producto es requerido';
    } else if( !values.idProduct.length > 36 ) {
        errors.idProduct = 'El ID del producto debe tener como maximo 36 caracteres';
    } else if( !values.idProduct.length < 36 ) {
        errors.idProduct = 'El ID del producto debe tener al menos 36 caracteres';
    }

    // * Validar la cantidad de productos
    if( !values.amountProduct ) {
        errors.amountProduct = 'La cantidad de productos es requerida';
    } else if( !values.amountProduct.match(/^[0-9]+$/) ) {
        errors.amountProduct = 'La cantidad de productos debe ser un numero entero';
    } 

    // * Validar el precio unitario
    if( !values.purchasePrice ) {
        errors.purchasePrice = 'El precio unitario es requerido';
    } else if( !values.purchasePrice.match(/^[0-9]+$/) ) {
        errors.purchasePrice = 'El precio unitario debe ser un numero entero';
    }

    // * Validar el precio total
    if( !values.amount ) {
        errors.amount = 'El precio total es requerido';
    } else if( !values.amount.match(/^[0-9]+$/) ) {
        errors.amount = 'El precio total debe ser un numero entero';
    }

    // * Validar la fecha de la venta
    if( !values.date ) {
        errors.date = 'La fecha de la venta es requerida';
    } else if( !values.date.length > 10 ) {
        errors.date = 'La fecha de la venta debe tener como maximo 10 caracteres';
    } else if( !values.date.length < 10 ) {
        errors.date = 'La fecha de la venta debe tener al menos 10 caracteres';
    } else if( !values.date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) ) {
        errors.date = 'La fecha de la venta debe tener el formato YYYY-MM-DD';
    }

    return errors;
}