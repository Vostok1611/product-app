const API_BASE_URL = 'https://dummyjson.com/products'

export const fetchProducts = async (limit = 8) => {
  try {
    const url = limit === 0 
      ? `${API_BASE_URL}?limit=0` 
      : `${API_BASE_URL}?limit=${limit}`
    
    const response = await fetch(url)
    if (!response.ok) throw new Error('Network response was not ok')
    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`)
    if (!response.ok) throw new Error('Product not found')
    return await response.json()
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

export const updateProduct = async (id, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return await response.json()
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    })
    return await response.json()
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}

export const createProduct = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return await response.json()
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}