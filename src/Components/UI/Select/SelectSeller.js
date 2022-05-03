import React, { useContext, useEffect } from 'react';
import Proptypes from 'prop-types';

import { SellerContext } from '../../../Context/Seller/SellerContext';

export const SelectSeller = ({ value, onChange }) => {
    const sellerContext = useContext( SellerContext );
    const { sellerList, getSellers } = sellerContext;

    // eslint-disable-next-line
    useEffect(() => { getSellers() } , []);
    
    return (
        <select 
            className='select' 
            name='idSeller' 
            onChange={ onChange } 
            value={ value }
        >
            <option value=''>Seleccione una Vendedor</option>
            {
                sellerList.map(( seller ) => (
                    <option key={ seller.id } value={ seller.id }>{ `${ seller.name } ${ seller.lastName }` }</option>
                ))
            }
        </select>
    );
}

SelectSeller.propTypes = {
    value: Proptypes.string.isRequired,
    onChange: Proptypes.func.isRequired
}