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
        case types_person.addPersonFailed:
            return {
                ...state,
                error: true,
                message: action.payload,
                typeMessage: 'alert-error',
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