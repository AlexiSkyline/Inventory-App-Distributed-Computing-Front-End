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
        typeMessage: '',
        productSearch: '',
        productSearchFilter: [],
        productSearchFilterStatus: false,
        productModeEdit: false,
    }

    const [ state, dispatch ] = useReducer( productReducer, initialState );

    const createProduct = async ( product ) => {
        try {
            const response = await clientAxios.post( '/api/product', {
                name: product.name,
                description: product.description,
                price: product.price,
                idUnitMesurement: product.idUnitMesurement,
                idBrand: product.idBrand,
                stock: 100,
                idProvider: product.idProvider
            });

            dispatch({
                type: types.addProduct,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: types.addProductFailed
            });
            console.log(error);
        }

        setTimeout(() => {
            initialState.message = '';
        } , 3000);
    }

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
        }
    }

    return (
        <ProductContext.Provider 
            value={{ 
                products: state.products, 
                loading: state.loading, 
                error: state.error,
                message: state.message,
                typeMessage: state.typeMessage,
                getProducts,
                deleteProduct,
                createProduct
            }}
        >
            { props.children }
        </ProductContext.Provider>
    );
}