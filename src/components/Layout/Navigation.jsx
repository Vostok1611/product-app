import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <>
      <NavLink to="/products" className="nav-link">
        Products
      </NavLink>
      <NavLink to="/create-product" className="nav-link">
        Create Product
      </NavLink>
    </>
  )
}

export default Navigation