import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getLocalProducts, saveLocalProducts } from '../../services/storage'

const LocalProductTable = () => {
  const [products, setProducts] = useState([])
  const [filterPublished, setFilterPublished] = useState('all')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    const localProducts = getLocalProducts()
    setProducts(localProducts)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== id)
      setProducts(updatedProducts)
      saveLocalProducts(updatedProducts)
    }
  }

  const filteredProducts = filterPublished === 'all' 
    ? products 
    : products.filter(product => product.published === (filterPublished === 'published'))

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <h3>No products created yet</h3>
        <p>Create your first product using the form!</p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label>Filter by status:</label>
          <select 
            value={filterPublished}
            onChange={(e) => setFilterPublished(e.target.value)}
            className="form-control"
            style={{ width: '200px' }}
          >
            <option value="all">All Products</option>
            <option value="published">Published Only</option>
            <option value="unpublished">Unpublished Only</option>
          </select>
        </div>
        
        <div>
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.description.substring(0, 50)}...</td>
                <td>
                  <span style={{
                    padding: '5px 10px',
                    borderRadius: '15px',
                    backgroundColor: product.published ? '#d4edda' : '#f8d7da',
                    color: product.published ? '#155724' : '#721c24'
                  }}>
                    {product.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                <td className="table-actions">
                  <Link 
                    to={`/edit-product/${product.id}`}
                    className="btn btn-secondary"
                    style={{ padding: '5px 10px', fontSize: '14px' }}
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-danger"
                    style={{ padding: '5px 10px', fontSize: '14px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LocalProductTable