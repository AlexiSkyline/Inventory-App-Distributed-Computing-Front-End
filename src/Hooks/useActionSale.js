import { useContext } from 'react';
import { AlertContext } from '../Context/Alert/AlertContext';
import { NewSaleContext } from '../Context/NewSale/NewSaleContext';

export const useActionSale = () => {
    const newSalesContext = useContext( NewSaleContext );
    const { cart, addSale } = newSalesContext;

    const alertContext = useContext( AlertContext );
    const { showAlert } = alertContext;

    const handleNewSales = (e) => {
        e.preventDefault();

        if( cart.length == 0 ) {
            return showAlert( 'No hay productos en el carrito', 'alert-error' );
        }

        addSale();
    }

    return [ handleNewSales ]
}