import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/Auth/AuthContext';
import { MenuContext } from '../../../Context/Menu/MenuContext';
import { SideBar } from '../SideBar/SideBar';

export const ToolBar = () => {
    const authContext = useContext( AuthContext );
    const { user } = authContext;

    const menuContext = useContext( MenuContext );
    const { currentPage, activeMenu, activateMenu } = menuContext;

    return (
        <>
            <SideBar />

            <div className={ `toolbar__content ${ activeMenu ? 'active' : '' }` }>
                <div className='toolbar__changes'>
                    <div className='toolbar__button'>
                        <img 
                            src={ `./assets/${ activeMenu ? 'xx.png' : 'menu.png' }` } 
                            alt='menu' 
                            onClick={ () => activateMenu( !activeMenu ) }
                        />
                    </div>

                    <div className='toolbar__title'>
                        <span>{ currentPage }</span>
                    </div>
                </div>

                <div className='toolbar__user'>
                    <span>Hola, { user.name }</span>
                </div>
            </div>
        </>
    );
}