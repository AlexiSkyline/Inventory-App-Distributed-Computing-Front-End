import React from 'react'
import { clientAxios } from '../../Config/Axios';
import { types_business } from '../../Types/types.business';
import { BusinessContext } from './BusinessContext';
import { businessReducer } from './businessReducer';

export const BusinessState = ( props ) => {
    const path = '/api/Business';
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

    const createBusiness = async ( business ) => {
        try {
            const response = await clientAxios.post( path, {
                name: business.name,
                address: business.address,
            });
            dispatch({
                type: types_business.addBusiness,
                payload: response.data
            });
        } catch ( error) { 
            dispatch({
                type: types_business.addBusinessFailed,
                payload: error.response.data.errors.Description[0]
            })
        }

        deleteMessage();
    }

    const getBusiness = async () => {
        try {
            const response =  await clientAxios.get( path );
            dispatch({
                type: types_business.getBusiness,
                payload: response.data.results
            });
        } catch (error) {
            dispatch({
                type: types_business.getBusinessFailed,
            });
        }
    }
    
    const updateBusiness = async ( business ) => {
        try {
            const response = await clientAxios.put( `${ path }/${ state.businessEdit.id }`, {
                name: business.name,
                address: business.address,
            });
            dispatch({
                type: types_business.updateBusiness,
                payload: response.data.message
            });
        } catch ( error) { 
            dispatch({
                type: types_business.updateBusinessFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const deleteBusiness = async ( id ) => {
        try {
            const response = await clientAxios.delete( `${ path }/${ id }` );
            dispatch({
                type: types_business.deleteBusiness,
                payload: response.data.message
            });
        } catch ( error) { 
            dispatch({
                type: types_business.deleteBusinessFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const activeModeEdit = ( business ) => {
        dispatch({
            type: types_business.activeModeEdit,
            payload: business
        });
    }

    const desactiveModeEdit = () => {
        setTimeout(() => {
            dispatch({
                type: types_business.desactiveModeEdit
            });
        } , 100);
    }

    const modeSearchBusinessDesactive = () => {
        dispatch({
            type: types_business.searchBusinesDesactive
        });
    }

    const activeModeSearch = ( value ) => {
        if( value.trim() !== '' ) {
            dispatch({
                type: types_business.searchBusinesActive,
                payload: value
            });
        } else {
            modeSearchBusinessDesactive();
        }
    }
    
    return (
        <BusinessContext.Provider 
            value={{
                business: state.business,
                message: state.message,
                typeMessage: state.typeMessage,
                businessSearchFilter: state.businessSearchFilter,
                businessSearchFilterStatus: state.businessSearchFilterStatus,
                businessModeEdit: state.businessModeEdit,
                businessEdit: state.businessEdit,
                createBusiness,
                getBusiness,
                deleteBusiness,
                updateBusiness,
                deleteMessage,
                activeModeEdit,
                desactiveModeEdit,
                activeModeSearch,
                modeSearchBusinessDesactive
            }}
        >
            {props.children}
        </BusinessContext.Provider>
    );
}