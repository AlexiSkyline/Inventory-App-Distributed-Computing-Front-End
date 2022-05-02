import React, { useContext, useEffect } from 'react';
import Proptypes from 'prop-types';

import { SalesContext } from '../../../Context/Sales/SalesContext';

export const SelectSales = ({ value, onChange }) => {
    const salesContext = useContext( SalesContext );
    const { salesList, getSales } = salesContext;

    // eslint-disable-next-line
    useEffect(() => { getSales() } , []);

    return (
        <select 
            className='select' 
            name='idSale' 
            onChange={ onChange } 
            value={ value }
        >
            <option value=''>Seleccione una Venta</option>
            {
                salesList.map( ( sale ) => (
                    <option key={ sale.id } value={ sale.id }>{ sale.folio }</option>
                ))
            }
        </select>
    );
}

SelectSales.propTypes = {
    value: Proptypes.string.isRequired,
    onChange: Proptypes.func.isRequired
}