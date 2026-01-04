import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { updateProduct, deleteProduct } from '../services/api'
import { getLocalProducts, saveLocalProducts } from '../services/storage'

const EditProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    published: false
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = () => {
    const products = getLocalProducts()
    const foundProduct = products.find(p => p.id === parseInt(id))
    
    if (foundProduct) {
      setProduct(foundProduct)
      setFormData({
        title: foundProduct.title,
        price: foundProduct.price,
        description: foundProduct.description,
        published: foundProduct.published || false
      })
    }
    
    setLoading(false)
  }

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

    setSaving(true)
    try {
      // 1. Эмуляция API запроса
      await updateProduct(id, {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description
      })

      // 2. Обновление в localStorage
      const products = getLocalProducts()
      const updatedProducts = products.map(p => 
        p.id === parseInt(id) 
          ? { 
              ...p, 
              ...formData, 
              price: parseFloat(formData.price),
              updatedAt: new Date().toISOString()
            } 
          : p
      )
      
      saveLocalProducts(updatedProducts)

      alert('Product updated successfully!')
      navigate('/products')
    } catch (error) {
      console.error('Error:', error)
      alert('Error updating product')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return
    }

    try {
      // 1. Эмуляция API запроса
      await deleteProduct(id)

      // 2. Удаление из localStorage
      const products = getLocalProducts()
      const updatedProducts = products.filter(p => p.id !== parseInt(id))
      
      saveLocalProducts(updatedProducts)

      alert('Product deleted successfully!')
      navigate('/products')
    } catch (error) {
      console.error('Error:', error)
      alert('Error deleting product')
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

  if (loading) return <div className="spinner"><div className="spinner-inner"></div></div>
  if (!product) return <div className="empty-state">Product not found</div>

  return (
    <div className="form-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Edit Product</h1>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete Product
        </button>
      </div>
      
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

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ flex: 1, padding: '12px' }}
            disabled={saving}
          >
            {saving ? 'Updating...' : 'Update Product'}
          </button>
          <button 
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
            style={{ padding: '12px 24px' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProductPage