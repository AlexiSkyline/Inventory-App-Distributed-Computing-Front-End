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

        deleteMessage();
    }

    const deleteProduct = async ( id ) => {
        try {
            const response = await clientAxios.delete( `/api/Product/${ id }` );
            dispatch({
                type: types.deleteProduct,
                payload: { id: response.data.id, message: response.data.message }
            });
        } catch (error) {
            dispatch({
                type: types.deleteProductFailed,
                payload: error.response.data.message
            });
        }

        deleteMessage();
    }

    const activeModeEdit = () => {
        dispatch({
            type: types.activeModeEdit
        });
    }

    const desactiveModeEdit = () => {
        dispatch({
            type: types.desactiveModeEdit
        });
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
                getProducts,
                deleteProduct,
                createProduct,
                activeModeEdit,
                desactiveModeEdit
            }}
        >
            { props.children }
        </ProductContext.Provider>
    );
}