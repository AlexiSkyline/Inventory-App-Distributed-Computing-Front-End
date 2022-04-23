import React, { useReducer } from 'react';
import { clientAxios } from '../../Config/Axios';
import { types_brand } from '../../Types/types.brand';
import { BrandContext } from './BrandContext';
import { brandReducer } from './brandReducer';

export const BrandState = ( props ) => {
    const path = '/api/Brand';
    const initialState = {
        brands: [],
        error: null,
        message: '',
        typeMessage: '',
        brandSearch: '',
        brandSearchFilter: [],
        brandSearchFilterStatus: false,
        brandModeEdit: false,
        brandEdit: null
    }

    const [ state, dispatch ] = useReducer( brandReducer, initialState );

    const deleteMessage = () => {
        setTimeout(() => {
            dispatch({ type: types_brand.removeMessages });
        } , 3000);
    }

    const createBrand = async ( brand ) => { 
        try {
            const response = await clientAxios.post( path, {
                description: brand.description
            });

            dispatch({
                type: types_brand.addBrand,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: types_brand.addBrandFailed,
                payload: error.response.data.errors.Description[0]
            });
        }

        deleteMessage();
    }

    const getBrands = async () => {
        try {
            const response = await clientAxios.get( path );
            dispatch({
                type: types_brand.getBrands,
                payload: response.data.results
            });
        } catch ( error ) {
            dispatch({
                type: types_brand.getBrandsFailed
            });
        }
    }

    const deleteBrand = async ( id ) => {
        try {
            const response = await clientAxios.delete( path + `/${ id }` );
            dispatch({
                type: types_brand.deleteBrand,
                payload: response.data.message
            });
        } catch ( error ) {
            dispatch({
                type: types_brand.deleteBrandFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const activeModeEdit = ( brand ) => {
        dispatch({
            type: types_brand.activeModeEdit,
            payload: brand
        });
    }

    const desactiveModeEdit = () => {
        setTimeout(() => {
            dispatch({
                type: types_brand.desactiveModeEdit
            });
        } , 500);
    }
    
    return (
        <BrandContext.Provider
            value={{
                brands: state.brands,
                message: state.message,
                typeMessage: state.typeMessage,
                brandModeEdit: state.brandModeEdit,
                brandEdit: state.brandEdit,
                createBrand,
                getBrands,
                deleteBrand,
                activeModeEdit,
                desactiveModeEdit
            }}
        >
            { props.children }
        </BrandContext.Provider>
    );
}