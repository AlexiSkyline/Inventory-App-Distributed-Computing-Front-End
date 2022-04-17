import React from 'react';
import { OptionsHome } from '../../Data/Options';
import { OptionCards } from '../UI/Card/OptionsCards';

export const HomeScreen = () => {
    return (
        <OptionCards
            title='Bienvenido. Elija una opción'
            listOptions={ OptionsHome }
        />
    );
}