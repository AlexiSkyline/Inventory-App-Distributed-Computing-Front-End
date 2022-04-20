import React, { useReducer } from 'react'
import { clientAxios } from '../../Config/Axios';
import { types } from '../../Types/types';
import { ProductContext } from './ProductContext';
import { productReducer } from './productReducer';

export const ProductState = ( props ) => {
    const initialState = {
        products: [],
        loading: false,
        error: null,
        message: '',
        productSearch: '',
        productSearchFilter: [],
        productSearchFilterStatus: false,
        productModeEdit: false,
    }

    const [ state, dispatch ] = useReducer( productReducer, initialState );

    const getProducts = async () => {
        try {
            const response = await clientAxios.get( '/api/Product' );
            dispatch({
                type: types.getProducts,
                payload: response.data.results
            });
        } catch (error) {
            dispatch({
                type: types.getProductsFailed
            });
        }
    }

    const deleteProduct = async ( id ) => {
        try {
            const response = await clientAxios.delete( `/api/Product/${ id }` );
            dispatch({
                type: types.deleteProduct,
                payload: response.data.message
            });
        } catch (error) {
            dispatch({
                type: types.deleteProductFailed,
                payload: error.response.data.message
            });
            console.log( error )
        }
    }

    return (
        <ProductContext.Provider 
            value={{ 
                products: state.products, 
                loading: state.loading, 
                error: state.error,
                message: state.message,
                getProducts,
                deleteProduct
            }}
        >
            { props.children }
        </ProductContext.Provider>
    );
}