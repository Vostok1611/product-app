import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchProductById } from '../services/api'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    setLoading(true)
    try {
      // Используем API для получения одного продукта
      const data = await fetchProductById(id)
      setProduct(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="spinner"><div className="spinner-inner"></div></div>
  if (!product) return <div>Product not found</div>

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '20px' }}>
        ← Back
      </button>

      <img src={product.thumbnail} alt={product.title} className="detail-image" />
      
      <h1 className="detail-title">{product.title}</h1>
      <p className="detail-price">${product.price}</p>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <span className="badge">{product.category}</span>
        <span className="badge">{product.brand}</span>
        <span className="badge">Rating: {product.rating} ⭐</span>
      </div>
      
      <p className="detail-description">{product.description}</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '15px',
        marginBottom: '30px'
      }}>
        <div className="info-card">
          <div>Discount</div>
          <div className="info-value">{product.discountPercentage}%</div>
        </div>
        <div className="info-card">
          <div>Stock</div>
          <div className="info-value">{product.stock}</div>
        </div>
        <div className="info-card">
          <div>Weight</div>
          <div className="info-value">{product.weight}</div>
        </div>
        <div className="info-card">
          <div>SKU</div>
          <div className="info-value">{product.sku}</div>
        </div>
      </div>

      {/* Отзывы (reviews) */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="reviews-section">
          <h2>Customer Reviews ({product.reviews.length})</h2>
          {product.reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-user">
                {review.reviewerName} ({review.reviewerEmail})
              </div>
              <div className="review-rating">
                Rating: {'⭐'.repeat(review.rating)}
              </div>
              <p>{review.comment}</p>
              <div style={{ fontSize: '12px', color: '#999' }}>
                {new Date(review.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Галерея изображений */}
      {product.images && product.images.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Product Images</h3>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto' }}>
            {product.images.map((img, index) => (
              <img key={index} src={img} alt={`${product.title} ${index + 1}`} style={{ height: '100px' }} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailPage