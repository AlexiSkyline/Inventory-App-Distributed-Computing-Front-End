import React, { useReducer } from 'react';
import { clientAxios } from '../../Config/Axios';
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

    const createPerson = async ( data, type = '' ) => { 
        try {
            const response = await clientAxios.post( `/api/${ type }`, {
                name: data.name,
                lastName: data.lastName,
                rfc: data.rfc,
                address: data.address,
                email: data.email,
                phoneNumber: data.phoneNumber
            });
            dispatch({
                type: types_person.addPerson,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: types_person.addPersonFailed,
                payload: error.response.data.errors.Description[0]
            });
        }

        deleteMessage();
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
                createPerson,
                deleteMessage,
            }}
        >
            { props.children }
        </PersonContext.Provider>
    );
}