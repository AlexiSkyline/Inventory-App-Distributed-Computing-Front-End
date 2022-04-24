import { types_person } from "../../Types/types.person";

export const personReducer = ( state, action ) => {
    switch( action.type ) {
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