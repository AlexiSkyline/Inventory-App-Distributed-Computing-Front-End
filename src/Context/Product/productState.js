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
        productSearchFilter: [],
        productSearchFilterStatus: false,
        productModeEdit: false,
        productEdit: null
    }

    const [ state, dispatch ] = useReducer( productReducer, initialState );

    const deleteMessage = () => {
        setTimeout(() => {
            dispatch({ type: types.removeMessages });
        } , 3000);
    }

    const createProduct = async ( product ) => {
        try {
            const response = await clientAxios.post( '/api/product', {
                name: product.name,
                description: product.description,
                price: product.price,
                idUnitMesurement: product.idUnitMesurement,
                idBrand: product.idBrand,
                stock: product.stock,
                idProvider: product.idProvider
            });

            dispatch({
                type: types.addProduct,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: types.addProductFailed,
                payload: error.response.data.errors.Description[0]
            });
        }

        deleteMessage();
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

        deleteMessage();
    }

    const activeModeEdit = ( product = {} ) => {
        product.idUnitMesurement = '';
        product.idBrand = '';
        product.idProvider = '';   

        dispatch({
            type: types.activeModeEdit,
            payload: product
        });
    }

    const desactiveModeEdit = () => {
        setTimeout(() => {
            dispatch({
                type: types.desactiveModeEdit
            });
        } , 500);
    }

    const updateProduct = async ( product ) => {
        try {
            const response = await clientAxios.put( `/api/Product/${ state.productEdit.id }`, {
                name: product.name,
                description: product.description,
                price: product.price,
                idUnitMesurement: product.idUnitMesurement,
                idBrand: product.idBrand,
                stock: product.stock,
                idProvider: product.idProvider
            });

            dispatch({
                type: types.updateProduct,
                payload: response.data.message
            });
        } catch (error) {
            dispatch({
                type: types.updateProductFailed,
                payload: error.response.data.message
            });
        }
    }
    
    const modeSearchProductDesactive = () => {
        dispatch({
            type: types.searchProductDesactive
        });
    }

    const searchProduct = ( filter ) => {
        if( filter.trim() !== '' ) {
            dispatch({
                type: types.searchProductActive,
                payload: filter
            });
        } else {
            modeSearchProductDesactive();
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
                productModeEdit: state.productModeEdit,
                productEdit: state.productEdit,
                productSearchFilter: state.productSearchFilter,
                productSearchFilterStatus: state.productSearchFilterStatus,
                getProducts,
                deleteProduct,
                createProduct,
                activeModeEdit,
                desactiveModeEdit,
                updateProduct,
                searchProduct,
                modeSearchProductDesactive
            }}
        >
            { props.children }
        </ProductContext.Provider>
    );
}