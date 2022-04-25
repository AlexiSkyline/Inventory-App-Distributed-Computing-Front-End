import React from 'react'
import { types } from '../../Types/types';
import { ModeEditContext } from './ModeEditContext';
import { modeEditReducer } from './modeEditReducer';

export const ModeEditState = ( props ) => {
    const initialState = {
        globalMessage: false,
        statusEditMode: false,
        editInfo: null,
    }

    const [ state, dispatch ] = React.useReducer( modeEditReducer, initialState );

    const activeModeEdit = ( body ) => {
        dispatch({
            type: types.activeModeEdit,
            payload: body
        });
    }

    const desactiveModeEdit = () => {
        dispatch({
            type: types.desactiveModeEdit
        });
    }

    return (
        <ModeEditContext.Provider
            value={{
                statusEditMode: state.statusEditMode,
                editInfo: state.editInfo,
                activeModeEdit,
                desactiveModeEdit,
            }}
        >
            { props.children }
        </ModeEditContext.Provider>
    );
}