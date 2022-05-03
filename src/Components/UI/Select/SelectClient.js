import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ClientContext } from '../../../Context/Client/ClientContext';


export const SelectClient = ({ value, onChange }) => {
    const clientContext = useContext( ClientContext );
    const { clientList, getClients } = clientContext;

    // eslint-disable-next-line
    useEffect(() => { getClients() } , []);

    return (
        <select
            className='select'
            name='idClient'
            onChange={ onChange }
            value={ value }
        >
            <option value=''>Seleccione un Cliente</option>   
            {
                clientList.map(( client ) => (
                    <option key={ client.id } value={ client.id }>{ `${ client.name } ${ client.lastName }` }</option>
                ))
            }
        </select>
    );
}

SelectClient.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}