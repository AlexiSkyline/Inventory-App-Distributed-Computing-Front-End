import React from 'react'
import { types_business } from '../../Types/types.business';
import { BusinessContext } from './BusinessContext';
import { businessReducer } from './businessReducer';

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

    const [ state, dispatch ] = React.useReducer( businessReducer, initialState );

    const deleteMessage = () => {
        setTimeout( () => {
            dispatch({ type: types_business.removeMessages });
        } , 3000 );
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
                deleteMessage,
            }}
        >
            {props.children}
        </BusinessContext.Provider>
    );
}