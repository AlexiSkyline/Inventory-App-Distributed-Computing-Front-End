import { useEffect, useState } from 'react';

export const useSetUpSale = ( initialState, toolsObject ) => {
    const { searchClientById, searchProductById, listClientFound, productSearchFilter } = toolsObject;
    const [ valueFormReading, setFormReading ] = useState( initialState );

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
    } , [ listClientFound, valueFormReading ]);
   
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
    } , [ productSearchFilter, valueFormReading ]);

    // * State para almacenar el parametro de busqueda
    function handleSubmit(e) {
        e.preventDefault();
        if( e.target.className.includes('btn__search-client') ) {
            searchClientById( e.target.previousSibling.value );
        } else if( e.target.className.includes('btn__search-product') ) {
            searchProductById( e.target.previousSibling.value );
        }
    }

    function handleInputReset() {
        setFormReading( initialState );
    }

    return [ valueFormReading, handleSubmit, handleInputReset ];
}