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

    const updateBrand = async ( brand ) => {
        try {
            const response = await clientAxios.put( path + `/${ state.brandEdit.id }`, {
                description: brand.description
            });

            dispatch({
                type: types_brand.updateBrand,
                payload: response.data.message
            });
            getBrands();
        } catch (error) {
            dispatch({
                type: types_brand.updateBrandFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const deleteBrand = async ( id ) => {
        try {
            const response = await clientAxios.delete( path + `/${ id }` );
            dispatch({
                type: types_brand.deleteBrand,
                payload: response.data.message
            });
            getBrands();
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

    const desactiveModeEditBrand = () => {
        dispatch({
            type: types_brand.desactiveModeEdit
        });
    }
    
    const modeSearchBrandDesactive = () => {
        dispatch({
            type: types_brand.searchBrandDesactive
        });
    }

    const activeModeSearch = ( value ) => {
        if( value.trim() !== '' ) {
            dispatch({
                type: types_brand.searchBrandActive,
                payload: value
            });
        } else {
            modeSearchBrandDesactive();
        }
    }

    return (
        <BrandContext.Provider
            value={{
                brands: state.brands,
                message: state.message,
                typeMessage: state.typeMessage,
                brandSearchFilter: state.brandSearchFilter,
                brandSearchFilterStatus: state.brandSearchFilterStatus,
                brandModeEdit: state.brandModeEdit,
                brandEdit: state.brandEdit,
                createBrand,
                getBrands,
                updateBrand,
                deleteBrand,
                activeModeEdit,
                desactiveModeEditBrand,
                activeModeSearch,
                modeSearchBrandDesactive
            }}
        >
            { props.children }
        </BrandContext.Provider>
    );
}