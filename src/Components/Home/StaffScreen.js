import React from 'react';

import { OptionStaff } from '../../Data/Options';
import { OptionCards } from '../UI/Card/OptionsCards';

export const StaffScreen = () => {
    return (
        <OptionCards
            title='Administre a su Personal.'
            listOptions={ OptionStaff }
        />
    );
}