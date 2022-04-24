import { types_person } from "../../Types/types.person";

export const personReducer = ( state, action ) => {
    switch( action.type ) {
        case types_person.addPerson:
            return {
                ...state,
                peopleList: [ ...state.peopleList, action.payload ],
                message: action.payload.message,
                typeMessage: 'alert-ok',
            }
        case types_person.getPeople:
            return {
                ...state,
                peopleList: action.payload,
            }
        case types_person.updatePerson:
        case types_person.deletePerson:
            return {
                ...state,
                message: action.payload,
                typeMessage: 'alert-ok',
            }
        case types_person.addPersonFailed:
        case types_person.getPeopleFailed:
        case types_person.updatePersonFailed:
        case types_person.deletePersonFailed:
            return {
                ...state,
                error: true,
                message: action.payload,
                typeMessage: 'alert-error',
            }
        case types_person.activeModeEdit:
            return {
                ...state,
                statusEditModePerson: true,
                infPersonEdit: action.payload
            }
        case types_person.desactiveModeEdit:
            return {
                ...state,
                infPersonEdit: false,
                infPersonEdit: null
            }
        case types_person.removeMessages: 
            return {
                ...state,
                message: '',
                typeMessage: '',
                error: false,
            }
        default : 
            return state;
    }
}