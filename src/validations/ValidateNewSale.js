export const ValidateNewSale = ( value ) => {
    let errors = {};

    if( !value.idClient ) {
        errors.idClient = 'El Cliente es Obligatorio';
    }

    if( !value.idProductI ) {
        errors.idProductI = 'El Producto es Obligatorio';
    }

    if( !value.amountProduct ) {
        errors.amountProduct = 'La Cantidad es Obligatoria';
    } else if( value.amountProduct < 1 ) {
        errors.amountProduct = 'La Cantidad debe ser mayor a 0';
    } else if( value.amountProduct > value.stock ) {
        errors.amountProduct = 'La Cantidad debe ser menor o igual al Stock';
    }

    if( !value.iva ) {
        errors.iva = 'El IVA es Obligatorio';
    } else if( value.iva < 1 ) {
        errors.iva = 'El IVA debe ser mayor a 0';
    }

    if( !value.paymentType ) {
        errors.paymentType = 'El Tipo de Pago es Obligatorio';
    }

    return errors;
}