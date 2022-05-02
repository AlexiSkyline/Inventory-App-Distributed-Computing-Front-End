import React, { useContext, useEffect } from 'react';
import Proptypes from 'prop-types';

import { UnitMeasurementContext } from '../../../Context/UnitMeasurement/UnitMeasurementContext';

export const SelectUnitMeasurement = ({ value, onChange }) => {
    const unitMeasurementContext = useContext( UnitMeasurementContext );
    const { unitMs, getUnitMs } = unitMeasurementContext;

    // eslint-disable-next-line
    useEffect(() => { getUnitMs() }, []);

    return (
        <select 
            className='select' 
            name='idUnitMesurement' 
            onChange={ onChange } 
            value={ value }
        >
            <option value=''>Seleccione una Unidad de Medida</option>
            {
                unitMs.map( ( unitM ) => (
                    <option key={ unitM.id } value={ unitM.id }>{ unitM.description }</option>
                ))
            }
        </select>
    );
}

SelectUnitMeasurement.propTypes = {
    value: Proptypes.string.isRequired,
    onChange: Proptypes.func.isRequired
}