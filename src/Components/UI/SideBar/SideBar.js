import React, { useContext, useState } from 'react'

import { AuthContext } from '../../../Context/Auth/AuthContext';
import { Links } from '../../../Data/Links';
import { Item } from './Item';

export const SideBar = () => {
    const authContext = useContext( AuthContext );
    const { user } = authContext;

    const [ open, setOpen ] = useState(false);

    return (
        <div className={ `${ open ? 'sidebar__open' : 'sidebar__close' }` }>
            <div className='sidebar__header'>
                <img 
                    src={ `./assets/${ open ? 'xx.png' : 'menu.png' }` } 
                    alt='menu' 
                    className='menu__hamburger'
                    onClick={ () => setOpen( !open ) }
                />
                
                <div className='sidebar__header-user'>
                    <p>{ user.name }</p>
                </div>
            </div>

            <div className='link__container'>
                {
                    Links.map( ({ text, to, img }) => ( 
                        <Item 
                            key={ text }
                            open={ open }
                            to={ to }
                            text={ text } 
                            img={ img }
                        >
                            { text }
                        </Item>
                    ))
                }
            </div>
        </div>
    );
}