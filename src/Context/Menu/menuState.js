import { MenuContext } from "./MenuContext";

export const MenuState = ( props ) => { 
    const initialState = {
        menuIsActive: false,
        currentPage: 'Inicio'
    }

    return (
        <MenuContext.Provider>

        </MenuContext.Provider>
    );
} 