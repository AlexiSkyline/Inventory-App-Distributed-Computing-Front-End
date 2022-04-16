import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Item = ({ text, to, img, open }) => {
    return (
        <NavLink className={ `${ open ? 'link__open' : 'normal' } 
                              ${ img.props.alt === 'Cerrar sesión' && 'last__child' }` } to={ to }>
            <div>{ img }</div>

            { open ? <p>{ text } </p> : null }
        </NavLink>
    );
}