import { NavLink } from 'react-router-dom'
import Navigation from './Navigation'
import AuthButton from '../Auth/AuthButton'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <NavLink to="/" className="logo">
          Product Manager
        </NavLink>
        <nav className="nav">
          <Navigation />
          <AuthButton />
        </nav>
      </div>
    </header>
  )
}

export default Header