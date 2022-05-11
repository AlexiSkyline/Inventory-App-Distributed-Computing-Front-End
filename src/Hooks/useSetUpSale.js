import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../Context/Alert/AlertContext';

import { ClientContext } from '../Context/Client/ClientContext';
import { ProductContext } from '../Context/Product/ProductContext';

export const useSetUpSale = ( initialState ) => {
    const clientContext = useContext( ClientContext );
    const { searchClientById, listClientFound } = clientContext;

    const productContext = useContext( ProductContext );
    const { searchProductById, productSearchFilter, message: messageProduct,
        typeMessage: typeMessageProduct } = productContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;
    
    const [ valueFormReading, setFormReading ] = useState( initialState );

    useEffect( () => {
        if( messageProduct ) {
            showAlert( messageProduct, typeMessageProduct );
        }
        // eslint-disable-next-line
    } , [ messageProduct ]);

    useEffect(() => { 
        if( Object.values( listClientFound )[0] ) {
            setFormReading({ 
                ...valueFormReading, 
                client: listClientFound[0].name + ' ' + listClientFound[0].lastName,
                idClient: listClientFound[0].id
            });
        } else {
            setFormReading({ ...valueFormReading, client: '' });
        }
        // eslint-disable-next-line
    } , [ listClientFound ]);
   
    useEffect(() => { 
        if( Object.values( productSearchFilter )[0] ) {
            setFormReading({ 
                ...valueFormReading, 
                purchasePrice: productSearchFilter[0].price,
                product: productSearchFilter[0].name,
                idProduct: productSearchFilter[0].id,
                stock: productSearchFilter[0].stock,
            });
        } else {
            setFormReading({ 
                ...valueFormReading, 
                purchasePrice: '',
                product: '',
                stock: ''   
            });
        }
        // eslint-disable-next-line
    } , [ productSearchFilter ]);

    function handleSubmit(e) {
        e.preventDefault();
        if( e.target.className.includes('btn__search-client') ) {
            searchClientById( e.target.previousSibling.value );
        } else if( e.target.className.includes('btn__search-product') ) {
            searchProductById( e.target.previousSibling.value );
        }
    }

    function handleInputReset(e) {
        e.preventDefault();
        setFormReading( initialState );
    }

    return [ valueFormReading, handleSubmit, handleInputReset ];
}