export const types = {
    login: '[auth] login',
    logout: '[auth] logout',
    loginFailed: '[auth] login failed',

    showAlert: '[alert] show alert',
    removeAlert: '[alert] remove alert',
    
    currentPage: '[auth] current page',
    menuIsActive: '[auth] menu is active',

    addProduct: '[product] add product',
    addProductFailed: '[product] add product failed',

    getProducts: '[products] get products',
    getProductsSuccess: '[products] get products success',
    getProductsFailed: '[products] get products failed',

    deleteProduct: '[products] delete product',
    deleteProductSuccess: '[products] delete product success',
    deleteProductFailed: '[products] delete product failed',

    activeModeEdit: '[products] active mode edit',
    desactiveModeEdit: '[products] desactive mode edit',

    updateProduct: '[products] update product',
    updateProductSuccess: '[products] update product success',
    updateProductFailed: '[products] update product failed',
    
    removeMessages: '[messages] remove messages',

    uiOpenModal: '[ui] Open modal',
    uiCloseModal: '[ui] Close modal'
}