import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuContext } from '../../../Context/Menu/MenuContext';
import { Links } from '../../../Data/Links';
import { Item } from './Item';

export const SideBar = () => {
    const menuContext = useContext( MenuContext );
    const { activeMenu } = menuContext;

    return (
        <div className={ `${ activeMenu ? 'sidebar__open' : 'sidebar__close' }` }>
            <div className='link__container'>
                {
                    Links.map( ({ text, to, img }) => ( 
                        <Item 
                            key={ text }
                            open={ activeMenu }
                            to={ to }
                            text={ text } 
                            img={ img }
                        >
                            { text }
                        </Item>
                    ))
                }
            </div>

            <NavLink className={ `${ activeMenu ? 'link__open' : 'normal' } logout__item` }  to= { '/logout' }>
                <div>
                    <img src='./assets/cerrar_sesion.png' className='img__option' alt='Cerrar sesión' />
                </div>
                { activeMenu ? <p>Cerrar sesión</p> : null }
            </NavLink>
        </div>
    );
}