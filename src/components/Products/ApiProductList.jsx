import { useState, useEffect } from 'react'
import { fetchProducts } from '../../services/api'
import { Link } from 'react-router-dom'

const ApiProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(8)
  const [total, setTotal] = useState(0)

  const loadProducts = async (newLimit) => {
    setLoading(true)
    try {
      // Используем API как в документации
      const data = await fetchProducts(newLimit)
      setProducts(data.products)
      setTotal(data.total)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts(limit)
  }, [])

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit)
    loadProducts(newLimit)
  }

  if (loading) return <div className="spinner"><div className="spinner-inner"></div></div>

  return (
    <div>
      <div className="button-group">
        <button 
          onClick={() => handleLimitChange(8)}
          className={`btn ${limit === 8 ? 'btn-primary' : 'btn-secondary'}`}
        >
          8 Products
        </button>
        <button 
          onClick={() => handleLimitChange(16)}
          className={`btn ${limit === 16 ? 'btn-primary' : 'btn-secondary'}`}
        >
          16 Products
        </button>
        <button 
          onClick={() => handleLimitChange(0)} // limit=0 получает все продукты
          className={`btn ${limit === 0 ? 'btn-primary' : 'btn-secondary'}`}
        >
          All Products ({total})
        </button>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <Link to={`/products/${product.id}`} key={product.id} className="product-card">
            <img 
              src={product.thumbnail} 
              alt={product.title}
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">${product.price}</p>
              <p style={{ fontSize: '12px', color: '#666' }}>
                Rating: {product.rating} ⭐
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ApiProductList 