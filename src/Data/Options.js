export const OptionsHome = [
    {
        to: '/Ventas',
        title: 'Realizar una Venta',
        description: 'Hacer una venta',
        img: (
            <img src='./assets/Options/bienes.png' className='img__option' alt='Ventas' />
        ),
    },
    {
        to: '/Productos',
        title: 'Ver mis Productos',
        description: 'Registrar, eliminar o actualizar detalles productos',
        img: (
            <img src='./assets/Options/producto.png' className='img__option' alt='Productos' />
        ),
    }
    ,
    {
        to: '/Clientes',
        title: 'Mis Clientes',
        description: 'Registrar, eliminar o actualizar detalles de clientes',
        img: (
            <img src='./assets/Options/consumidor.png' className='img__option' alt='Clientes' />
        ),
    }
    ,
    {
        to: '/Ventas',
        title: 'Ventas Realizadas',
        description: 'Ver el historial de ventas realizadas',
        img: (
            <img src='./assets/Options/compras.png' className='img__option' alt='Ventas' />
        ),
    }
];