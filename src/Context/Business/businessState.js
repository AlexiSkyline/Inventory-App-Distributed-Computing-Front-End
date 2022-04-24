import React from 'react'
import { types_business } from '../../Types/types.business';
import { BusinessContext } from './BusinessContext';

export const BusinessState = ( props ) => {
    const initialState = {
        business: [],
        error: null,
        message: '',
        typeMessage: '',
        businessSearchFilter: [],
        businessSearchFilterStatus: false,
        businessModeEdit: false,
        businessEdit: null
    }
    
    return (
        <BusinessContext.Provider 
            value={{
                business: initialState.business,
                message: initialState.message,
                typeMessage: initialState.typeMessage,
                businessSearchFilter: initialState.businessSearchFilter,
                businessSearchFilterStatus: initialState.businessSearchFilterStatus,
                businessModeEdit: initialState.businessModeEdit,
                businessEdit: initialState.businessEdit,
            }}
        >
            {props.children}
        </BusinessContext.Provider>
    );
}