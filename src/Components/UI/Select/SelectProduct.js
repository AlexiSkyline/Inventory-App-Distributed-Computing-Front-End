import React, { useContext, useEffect } from 'react';
import Proptypes from 'prop-types';

import { ProductContext } from '../../../Context/Product/ProductContext';

export const SelectProduct = ({ value, onChange }) => {
    const productContext = useContext( ProductContext );
    const { products, getProducts } = productContext;

    // eslint-disable-next-line
    useEffect(() => { getProducts() } ,[]);

    return (
        <select
            className='select'
            name='idProduct'
            value={ value }
            onChange={ onChange }
        >
            <option value=''>Seleccione un producto</option>
            {
                products.map(( product ) => (
                    <option key={ product.id } value={ product.id }>{ product.name }</option>
                ))
            }
        </select>
    );
}

SelectProduct.propTypes = {
    value: Proptypes.string.isRequired,
    onChange: Proptypes.func.isRequired
}