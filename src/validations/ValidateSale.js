export const ValidateSales = ( values ) => {
    let errors = {};

    // * Validar el ID del Vendedor
    if( !values.idSeller ) {
        errors.idSeller = 'El ID del Vendedor es requerido';
    } else if( values.length > 36 ) {
        errors.idSeller = 'El ID del Vendedor debe tener como maximo 36 caracteres';
    } else if( values.length < 36 ) {
        errors.idSeller = 'El ID del Vendedor debe tener al menos 36 caracteres';
    }

    // * Validar el ID del Cliente
    if( !values.idClient ) {
        errors.idClient = 'El ID del Cliente es requerido';
    } else if( values.length > 36 ) {
        errors.idClient = 'El ID del Cliente debe tener como maximo 36 caracteres';
    } else if( values.length < 36 ) {
        errors.idClient = 'El ID del Cliente debe tener al menos 36 caracteres';
    }

    // * Validar el folio de la venta
    if( !values.folio ) {
        errors.folio = 'El folio de la venta es requerido';
    } else if( values.length > 40 ) {
        errors.folio = 'El folio de la venta debe tener como maximo 40 caracteres';
    } else if( values.length < 1 ) {
        errors.folio = 'El folio de la venta debe tener al menos 1 caracteres';
    } else if( isNaN( values.folio ) ) {
        errors.folio = 'El folio de la venta debe ser un numero';
    } else if( values.folio < 1 ) {
        errors.folio = 'El folio de la venta debe ser mayor a 0';
    } else if( values.folio > 999999999 ) {
        errors.folio = 'El folio de la venta debe ser menor a 999999999';
    } else if( values.folio < 1 ) {
        errors.folio = 'El folio de la venta debe ser mayor a 0';
    }  

    // * Validar el ID de la empresa
    if( !values.idBusiness ) {
        errors.idBusiness = 'El ID de la empresa es requerido';
    } else if( values.length > 36 ) {
        errors.idBusiness = 'El ID de la empresa debe tener como maximo 36 caracteres';
    } else if( values.length < 36 ) {
        errors.idBusiness = 'El ID de la empresa debe tener al menos 36 caracteres';
    }

    // * Validar el precio total
    if( !values.total ) {
        errors.total = 'El precio total es requerido';
    } else if( isNaN( values.total )  ) {
        errors.total = 'El precio total debe ser un numero';
    }

    // * Validar el el iva
    if( !values.iva ) {
        errors.iva = 'El iva es requerido';
    } else if( isNaN( values.iva ) ) {
        errors.iva = 'El iva debe ser un numero';
    }

    // * Validar el subtotal
    if( !values.subTotal ) {
        errors.subTotal = 'El subTotal es requerido';
    } else if( isNaN( values.subTotal ) ) {
        errors.subTotal = 'El subTotal debe ser un numero';
    }

    // * Validar el tipo de pago
    if( !values.paymentType ) {
        errors.paymentType = 'El tipo de pago es requerido';
    } else if( values.length > 20 ) {
        errors.paymentType = 'El tipo de pago debe tener como maximo 20 caracteres';
    } else if( values.length < 5 ) {
        errors.paymentType = 'El tipo de pago debe tener al menos 5 caracteres';
    }

    // * Validar la fecha de la venta
    if( !values.date ) {
        errors.date = 'La fecha de la venta es requerida';
    } else if( values.length > 10 ) {
        errors.date = 'La fecha de la venta debe tener como maximo 10 caracteres';
    } else if( values.length < 8 ) {
        errors.date = 'La fecha de la venta debe tener al menos 8 caracteres';
    }

    return errors;
}