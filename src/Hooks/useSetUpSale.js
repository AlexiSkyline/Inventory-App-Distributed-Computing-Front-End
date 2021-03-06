import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../Context/Alert/AlertContext';

import { ClientContext } from '../Context/Client/ClientContext';
import { ProductContext } from '../Context/Product/ProductContext';

export const useSetUpSale = ( initialState ) => {
    const clientContext = useContext( ClientContext );
    const { searchClientById, listClientFound, message: messageClient, typeMessage: typeMessageClient, 
                    searchClientByIdFailed, disactiveClientSearchMode } = clientContext;

    const [ isNotFirst, setIsNotFirst ] = useState(false);
    const [ isButtonSearchClient, setIsButtonSearchClient ] = useState(false);
    const [ isButtonSearchProduct, setIsButtonSearchProduct ] = useState(false);

    const productContext = useContext( ProductContext );
    const { searchProductById, productSearchFilter, message: messageProduct,
        typeMessage: typeMessageProduct, searchProductByIdFailed, modeSearchProductDesactive } = productContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;
    
    const [ valueFormReading, setFormReading ] = useState( initialState );

    useEffect( () => {
        if( messageProduct ) {
            showAlert( messageProduct, typeMessageProduct );
        } else if( messageClient ) {
            showAlert( messageClient, typeMessageClient );
        }
        // eslint-disable-next-line
    } , [ messageProduct, messageClient ]);

    useEffect(() => { 
        setIsButtonSearchClient(false);
        if( Object.values( listClientFound )[0] ) {
            setFormReading({ 
                ...valueFormReading, 
                client: listClientFound[0].name + ' ' + listClientFound[0].lastName,
                idClient: listClientFound[0].id
            });
        } else {
            setFormReading({ ...valueFormReading, client: '' });
            if( isNotFirst ) {
                searchClientByIdFailed( 'Cliente no encontrado' );
            }
        }
        // eslint-disable-next-line
    } , [ isButtonSearchClient ]);
   
    useEffect(() => { 
        setIsButtonSearchProduct(false);
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
            if( isNotFirst ) {
                searchProductByIdFailed( 'El Producto no encontrado' );
            }
        }
        // eslint-disable-next-line
    } , [ isButtonSearchProduct ]);

    function handleSubmit(e) {
        e.preventDefault();
        setIsNotFirst(true);
        if( e.target.className.includes('btn__search-client') ) {
            searchClientById( e.target.previousSibling.value );
            setIsButtonSearchClient(true);
        } else if( e.target.className.includes('btn__search-product') ) {
            searchProductById( e.target.previousSibling.value );
            setIsButtonSearchProduct(true);
        }
    }

    function handleInputReset() {
        setFormReading( initialState );
        disactiveClientSearchMode();
        modeSearchProductDesactive();
    }

    return [ valueFormReading, handleSubmit, handleInputReset ];
}