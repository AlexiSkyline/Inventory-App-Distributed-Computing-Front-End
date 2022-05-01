import React, { useContext, useEffect } from 'react';
import Proptypes from 'prop-types';

import { ProviderContext } from '../../../Context/Provider/ProviderContext';

export const SelectProvider = ({ value, onChange }) => {
    const providerContext = useContext( ProviderContext );
    const { providerList, getProviders } = providerContext;
    
    useEffect(() => { getProviders() }, [])
    
    return (
        <select
            className='select'
            name='idProvider'
            onChange={ onChange }
            value={ value }
        >
            <option value=''>Seleccione un Proveedor</option>
            {
                providerList.map( ( provider ) => (
                    <option key={ provider.id } value={ provider.id }>{ `${ provider.name } ${ provider.lastName }` }</option>
                ))
            }
        </select>
    );
}

SelectProvider.propTypes = {
    value: Proptypes.string.isRequired,
    onChange: Proptypes.func.isRequired
}