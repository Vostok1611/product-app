// Для хранения созданных продуктов
export const saveLocalProducts = (products) => {
  localStorage.setItem('localProducts', JSON.stringify(products))
}

export const getLocalProducts = () => {
  const products = localStorage.getItem('localProducts')
  return products ? JSON.parse(products) : []
}

// Для авторизации
export const saveAuthToStorage = (authData) => {
  localStorage.setItem('auth', JSON.stringify(authData))
}

export const getAuthFromStorage = () => {
  const auth = localStorage.getItem('auth')
  return auth ? JSON.parse(auth) : null
}

export const removeAuthFromStorage = () => {
  localStorage.removeItem('auth')
}