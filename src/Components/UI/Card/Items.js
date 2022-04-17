import React from 'react'
import { NavLink } from 'react-router-dom';

export const OptionCard = ({ to, title, description, img }) => {
    return (
        <NavLink
            to={ to }
        >
            <div className='card__info'>
                <div>{ img }</div>
                <h3 className='title__Card'>{ title }</h3>
                <p>{ description }</p>
            </div>
        </NavLink>
    );
}