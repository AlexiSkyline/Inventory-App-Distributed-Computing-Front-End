import { useEffect, useState } from 'react';

export const useSearchById = ( initialState, fn, fn2, objectListClient = '', objectListProduct = '' ) => {
    const [ valueFormReading, setFormReading ] = useState( initialState );

    useEffect(() => { 
        if( Object.values( objectListClient )[0] ) {
            setFormReading({ ...valueFormReading, client: objectListClient[0].name + ' ' + objectListClient[0].lastName });
        } else {
            setFormReading({ ...valueFormReading, client: '' });
        }
    } , [ objectListClient, valueFormReading ]);
   
    useEffect(() => { 
        if( Object.values( objectListProduct )[0] ) {
            setFormReading({ 
                ...valueFormReading, 
                purchasePrice: objectListProduct[0].price,
                product: objectListProduct[0].name,
                stock: objectListProduct[0].stock,
            });
        } else {
            setFormReading({ 
                ...valueFormReading, 
                purchasePrice: '',
                product: '',
                stock: ''   
            });
        }
    } , [ objectListProduct, valueFormReading ]);

    // * State para almacenar el parametro de busqueda
    function handleSubmit(e) {
        e.preventDefault();
        if( e.target.className.includes('btn__search-client') ) {
            fn( e.target.previousSibling.value );
        } else if( e.target.className.includes('btn__search-product') ) {
            fn2( e.target.previousSibling.value );
        }
    }

    function handleInputReset() {
        setFormReading( initialState );
    }

    return [ valueFormReading, handleSubmit, handleInputReset ];
}