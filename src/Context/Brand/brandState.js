import React from 'react';
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
    }

    const [ state, dispatch ] = React.useReducer( brandReducer, initialState );
    
    return (
        <BrandContext.Provider
            value={{
                brands: state.brands,
                getBrands,
                deleteBrand
            }}
        >
            { props.children }
        </BrandContext.Provider>
    );
}