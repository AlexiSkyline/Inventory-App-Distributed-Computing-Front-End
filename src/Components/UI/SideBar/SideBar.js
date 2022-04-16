import React from 'react';
import { NavLink } from 'react-router-dom';
import { Links } from '../../../Data/Links';
import { Item } from './Item';

export const SideBar = ({ open }) => {
    return (
        <div className={ `${ open ? 'sidebar__open' : 'sidebar__close' }` }>
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

            <NavLink className={ `${ open ? 'link__open' : 'normal' } logout__item` }  to= { '/logout' }>
                <div>
                    <img src='./assets/cerrar_sesion.png' className='img__option' alt='Cerrar sesión' />
                </div>
                { open ? <p>Cerrar sesión</p> : null }
            </NavLink>
        </div>
    );
}