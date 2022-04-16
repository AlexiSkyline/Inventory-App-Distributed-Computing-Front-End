import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/Auth/AuthContext';
import { SideBar } from '../SideBar/SideBar';

export const ToolBar = () => {
    const authContext = useContext( AuthContext );
    const { user, currentPage } = authContext;
    const [ open, setOpen ] = useState(false);

    return (
        <>
            <SideBar 
                open={ open }
            />
            <div className={ `toolbar__content ${ open ? 'active' : '' }` }>
                <div className='toolbar__changes'>
                    <div className='toolbar__button'>
                        <img 
                            src={ `./assets/${ open ? 'xx.png' : 'menu.png' }` } 
                            alt='menu' 
                            onClick={ () => setOpen( !open ) }
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