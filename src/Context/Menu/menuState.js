import { useReducer } from 'react';
import { types } from '../../Types/types';
import { MenuContext } from './MenuContext';
import { menuReducer } from './menuReducer';

export const MenuState = ( props ) => { 
    const initialState = {
        menuIsActive: false,
        currentPage: 'Inicio'
    }

    const [ state, dispatch ] = useReducer( menuReducer, initialState );

    const myCurrentPage = ( currentPage ) => {
        dispatch({
            type: types.currentPage,
            payload: currentPage
        });
    }

    return (
        <MenuContext.Provider
            value={{
                menuIsActive: state.menuIsActive,
                currentPage: state.currentPage,
                myCurrentPage
            }}
        >
            { props.children }
        </MenuContext.Provider>
    );
} 