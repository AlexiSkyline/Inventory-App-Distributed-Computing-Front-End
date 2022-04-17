import React from 'react'
import { OtherOption } from '../../Data/Options';
import { OptionCards } from '../UI/Card/OptionsCards';

export const OtherScreen = () => {
    return (
        <OptionCards
            title='Elija una opción para continuar.'
            listOptions={ OtherOption }
        />
    );
}