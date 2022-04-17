import React, { useContext } from 'react';

import { MenuContext } from '../../../Context/Menu/MenuContext';
import { OptionCard } from './Items';

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