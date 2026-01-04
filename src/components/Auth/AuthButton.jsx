import { useState, useEffect } from 'react'
import { getAuthFromStorage, saveAuthToStorage, removeAuthFromStorage } from '../../services/storage'

const AuthButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = getAuthFromStorage()
    setIsAuthenticated(!!auth)
  }, [])

  const handleLogin = () => {
    const authData = {
      user: 'admin',
      token: 'fake-jwt-token',
      timestamp: new Date().toISOString()
    }
    saveAuthToStorage(authData)
    setIsAuthenticated(true)
    alert('Successfully logged in as admin')
  }

  const handleLogout = () => {
    removeAuthFromStorage()
    setIsAuthenticated(false)
    alert('Successfully logged out')
  }

  return (
    <button 
      onClick={isAuthenticated ? handleLogout : handleLogin}
      className="auth-button"
    >
      {isAuthenticated ? 'Logout' : 'Login'}
    </button>
  )
}

export default AuthButton