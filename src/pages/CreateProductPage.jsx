import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../services/api'
import { saveLocalProducts, getLocalProducts } from '../services/storage'

const CreateProductPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    published: true
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    try {
      // 1. Эмуляция API запроса
      const apiResponse = await createProduct({
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description
      })

      // 2. Сохранение в localStorage
      const newProduct = {
        id: Date.now(), // локальный ID
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        published: formData.published,
        createdAt: new Date().toISOString(),
        // Добавляем поля из API ответа для совместимости
        ...apiResponse
      }

      const existingProducts = getLocalProducts()
      const updatedProducts = [...existingProducts, newProduct]
      saveLocalProducts(updatedProducts)

      // 3. Успешное создание
      alert('Product created successfully!')
      navigate('/products')
    } catch (error) {
      console.error('Error:', error)
      alert('Error creating product')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  return (
    <div className="form-container">
      <h1 style={{ marginBottom: '30px' }}>Create New Product</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product title"
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Price *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter price"
            step="0.01"
            min="0"
          />
          {errors.price && <div className="error">{errors.price}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter product description"
            rows="4"
          />
          {errors.description && <div className="error">{errors.description}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            Published
            <label className="switch">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
              />
              <span className="slider"></span>
            </label>
          </label>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '12px' }}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  )
}

export default CreateProductPage