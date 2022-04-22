export const types = {
    // ! Acciones para el inicio de session
    login: '[auth] login',
    logout: '[auth] logout',
    loginFailed: '[auth] login failed',

    // ! Acciones para activar las alertas
    showAlert: '[alert] show alert',
    removeAlert: '[alert] remove alert',
    
    // ! Acciones para el menu
    currentPage: '[auth] current page',
    menuIsActive: '[auth] menu is active',

    // ! Acciones para los productos
    addProduct: '[product] add product',
    addProductFailed: '[product] add product failed',

    getProducts: '[products] get products',
    getProductsFailed: '[products] get products failed',

    deleteProduct: '[products] delete product',
    deleteProductFailed: '[products] delete product failed',

    activeModeEdit: '[products] active mode edit',
    desactiveModeEdit: '[products] desactive mode edit',

    updateProduct: '[products] update product',
    updateProductFailed: '[products] update product failed',

    searchProductActive: '[products] search product active',
    searchProductDesactive: '[products] search product desactive',
    
    removeMessages: '[messages] remove messages',

    // ! Acciones para el modal
    uiOpenModal: '[ui] Open modal',
    uiCloseModal: '[ui] Close modal',

    addGlobalMessage: '[messages] add global message',
}