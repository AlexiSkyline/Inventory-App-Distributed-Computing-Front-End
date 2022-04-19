import React, { useReducer } from 'react'
import { ProductContext } from './ProductContext';
import { productReducer } from './productReducer';

export const ProductState = ( props ) => {
    const initialState = {
        products: [],
        loading: false,
        error: null,
        productSearch: '',
        productSearchFilter: [],
        productSearchFilterStatus: false,
    }

    const [ state, dispach ] = useReducer( productReducer, initialState );

    return (
        <ProductContext.Provider 
            value={{ 
                products: state.products, 
                loading: state.loading, 
                error: state.error 
            }}
        >
            { props.children }
        </ProductContext.Provider>
    );
}