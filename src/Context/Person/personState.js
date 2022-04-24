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

    const createPerson = async ( data, type ) => { 
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

    const getPeople = async ( type ) => {
        try {
            const response = await clientAxios.get( `/api/${ type }` );
            dispatch({
                type: types_person.getPeople,
                payload: response.data.results
            });
        } catch (error) {
            dispatch({
                type: types_business.getBusinessFailed,
            });
        }
    }

    const updatePerson = async ( data, type ) => {
        try {
            const response = await clientAxios.put( `/api/${ type }/${ state.infPersonEdit.id }`, {
                name: data.name,
                lastName: data.lastName,
                rfc: data.rfc,
                address: data.address,
                email: data.email,
                phoneNumber: data.phoneNumber
            });
            dispatch({
                type: types_person.updatePerson,
                payload: response.data.message
            })
        } catch (error) {
            dispatch({
                type: types_person.updatePersonFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const deletePerson = async ( id, type ) => {
        try {
            const response = await clientAxios.delete( `/api/${ type }/${ id }` );
            dispatch({
                type: types_person.deletePerson,
                payload: response.data.message
            });
        } catch (error) {
            dispatch({
                type: types_person.deletePersonFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const activeModeEdit = ( business ) => {
        dispatch({
            type: types_person.activeModeEdit,
            payload: business
        });
    }

    const desactiveModeEdit = () => {
        setTimeout(() => {
            dispatch({
                type: types_person.desactiveModeEdit
            });
        } , 500);
    }

    const disactivePersonEditingMode = () => {
        dispatch({
            type: types_person.searchPeopleDesactive
        });
    }

    const searchPeople = async ( value ) => {
        if( value.trim() !== '' ) {
            dispatch({
                type: types_person.searchPeopleActive,
                payload: value
            });
        } else {
            disactivePersonEditingMode();
        }
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
                getPeople,
                updatePerson,
                deletePerson,
                deleteMessage,
                activeModeEdit,
                desactiveModeEdit,
                searchPeople,
                disactivePersonEditingMode
            }}
        >
            { props.children }
        </PersonContext.Provider>
    );
}