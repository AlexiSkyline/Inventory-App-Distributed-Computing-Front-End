import React from 'react';
import { BrandContext } from './BrandContext';
import { brandReducer } from './brandReducer';

export const BrandState = ( props ) => {
    const initialState = {
        brands: [],
        loading: false,
        error: null,
        message: '',
        typeMessage: '',
        brandSearch: '',
        brandSearchFilter: [],
        brandSearchFilterStatus: false,
        brandModeEdit: false,
        brandEdit: null
    }

    const [ state, dispatch ] = React.useReducer( brandReducer, initialState );
    
    return (
        <BrandContext.Provider
            value={{
                brands: state.brands,
            }}
        >
            { props.children }
        </BrandContext.Provider>
    );
}