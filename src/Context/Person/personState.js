import React, { useReducer } from 'react';

import { PersonContext } from './PersonContext';
import { personReducer } from './personReducer';

export const personState = ( props ) => {
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