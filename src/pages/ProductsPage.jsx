import { useState } from 'react'
import ApiProductList from '../components/Products/ApiProductList'
import LocalProductTable from '../components/Products/LocalProductTable'

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState('api')
  const [filterPublished, setFilterPublished] = useState('all')

  return (
    <div>
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'api' ? 'active' : ''}`}
          onClick={() => setActiveTab('api')}
        >
          API Products
        </button>
        <button 
          className={`tab ${activeTab === 'local' ? 'active' : ''}`}
          onClick={() => setActiveTab('local')}
        >
          Created Products
        </button>
      </div>

      {activeTab === 'api' ? (
        <ApiProductList />
      ) : (
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '20px' 
          }}>
            <h2>Created Products</h2>
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
          <LocalProductTable filter={filterPublished} />
        </div>
      )}
    </div>
  )
}

export default ProductsPage