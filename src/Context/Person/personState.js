import React, { useReducer } from 'react';
import { types_person } from '../../Types/types.person';

import { PersonContext } from './PersonContext';
import { personReducer } from './personReducer';

export const PersonState = ( props ) => {
    const initialState = { 
        peopleList: [],
        error: null,
        message: '',
        typeMessage: '',
        listPeopleFound: [],
        searchModeStatus: false,
        statusEditModePerson: false,
        infPersonEdit: null,
    };

    const [ state, dispatch ] = useReducer( personReducer, initialState );
    
    const deleteMessage = () => { 
        setTimeout(() => {
            dispatch({ type: types_person.removeMessages });
        }, 3000 );
    }

    return (
        <PersonContext.Provider
            value={{
                peopleList: state.peopleList,
                error: state.error,
                message: state.message,
                typeMessage: state.typeMessage,
                listPeopleFound: state.listPeopleFound,
                searchModeStatus: state.searchModeStatus,
                statusEditModePerson: state.statusEditModePerson,
                infPersonEdit: state.infPersonEdit,
            }}
        >
            { props.children }
        </PersonContext.Provider>
    );
}