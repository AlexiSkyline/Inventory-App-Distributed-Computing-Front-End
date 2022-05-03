import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import { BusinessContext } from '../../../Context/Business/BusinessContext';

export const SelectBusiness = ({ value, onChange }) => {
    const businessContext = useContext( BusinessContext );
    const { business, getBusiness } = businessContext;

    // eslint-disable-next-line
    useEffect(() => { getBusiness() } , []);

    return (
        <select
            className='select'
            name='idBusiness'
            onChange={ onChange }
            value={ value }
        >
            <option value=''>Seleccione una empresa</option>
            {
                business.map(( business ) => (
                    <option key={ business.id } value={ business.id }>{ business.name }</option>
                ))
            }
        </select>
    );
}

SelectBusiness.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}