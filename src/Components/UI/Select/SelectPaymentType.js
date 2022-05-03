import React from 'react';
import PropTypes from 'prop-types';

export const SelectPaymentType = ({ value, onChange }) => {
    return (
        <select
            className='select'
            name='paymentType'
            onChange={onChange}
            value={value}
        >
            <option value=''>Seleccione un tipo de pago</option>
            <option value='EFECTIVO'>Efectivo</option>
            <option value='TARJETA'>Tarjeta</option>
            <option value='CHEQUE'>Cheque</option>
            <option value='TRANFERENCIA'>Transferencia</option>
            <option value='PAYPAL'>PayPal</option>
            <option value='MOVIL'>Pago por el Movil</option>
        </select>
    );
}

SelectPaymentType.prototype = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}