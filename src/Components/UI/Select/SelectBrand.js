import React, { useContext, useEffect } from 'react'
import Proptypes from 'prop-types';

import { BrandContext } from '../../../Context/Brand/BrandContext';

export const SelectBrand = ({ value, onChange }) => {
    const brandContext = useContext( BrandContext );
    const { brands, getBrands } = brandContext;

    useEffect(() => { getBrands() } , [getBrands]);

    return (
        <select 
            className='select' 
            name='idBrand' 
            onChange={ onChange } 
            value={ value }
        >
            <option value=''>Seleccione una Marca</option>
            {
                brands.map( ( brand ) => (
                    <option key={ brand.id } value={ brand.id }>{ brand.description }</option>
                ))
            }
        </select>
    );
}

SelectBrand.propTypes = {
    value: Proptypes.string.isRequired,
    onChange: Proptypes.func.isRequired
}