import React from 'react'
import { OptionActivities } from '../../Data/Options';
import { OptionCards } from '../UI/Card/OptionsCards';

export const ActivitiesScreen = () => {
    return (
        <OptionCards
            title='Realiza una venta o administra una actividad.'
            listOptions={ OptionActivities }
        />
    );
}