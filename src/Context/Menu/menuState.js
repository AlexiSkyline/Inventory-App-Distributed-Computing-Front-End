import { useReducer } from 'react';
import { types } from '../../Types/types';
import { MenuContext } from './MenuContext';
import { menuReducer } from './menuReducer';

export const MenuState = ( props ) => { 
    const initialState = {
        activeMenu: false,
        currentPage: 'Inicio'
    }

    const [ state, dispatch ] = useReducer( menuReducer, initialState );

    const myCurrentPage = ( currentPage ) => {
        dispatch({
            type: types.currentPage,
            payload: currentPage
        });
    }

    const activateMenu = () => {
        dispatch({
            type: types.menuIsActive
        });
    }

    return (
        <MenuContext.Provider
            value={{
                activeMenu: state.activeMenu,
                currentPage: state.currentPage,
                myCurrentPage,
                activateMenu
            }}
        >
            { props.children }
        </MenuContext.Provider>
    );
} 