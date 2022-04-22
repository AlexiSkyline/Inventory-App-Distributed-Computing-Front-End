import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { MenuContext } from '../../../Context/Menu/MenuContext';
import { OptionCard } from './Items';

/*
    * En este componente generamos el cuerpo de las opciones que se encuentran en cada una
    * de las siguientes rutas: "Inicio", "Pesonal", "Actividades" y "Otros"
    * Esta contienen una lista de card que se encuentran en el componente "Item"
    * @param {string} title - Es el titulo de cada una de las pantallas
    * @param {array} items - Es un arreglo de objetos que contienen informacion de cada card
    * @returns el componente OptionCard
 */

export const OptionCards = ({ title, listOptions }) => {
    const menuContext = useContext( MenuContext );
    const { activeMenu } = menuContext;

    return (
        <div className={ `content__page ${ activeMenu ? 'active' : '' }`}>
            <div className="info__page">
                <h1 className="title">{ title }</h1>

                <div className='card_container'>
                    {
                        listOptions.map( option => (
                            <OptionCard
                                key={ option.title }
                                to={ option.to }
                                title={ option.title }
                                description={ option.description }
                                img={ option.img }
                            >
                            </OptionCard>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

OptionCards.prototype = {
    title: PropTypes.string.isRequired,
    listOptions: PropTypes.array.isRequired
}