import { Link, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { getCurrentUser, logout } from '../utils/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = () => {
      setUser(getCurrentUser());
    };
    
    window.addEventListener('storage', handleStorage);
    window.addEventListener('userChanged', handleStorage);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('userChanged', handleStorage);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    window.dispatchEvent(new Event('userChanged'));
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">+</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MediCare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/doctors" className="text-gray-700 hover:text-blue-600 transition-colors">
              Doctors
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
                {user.role === 'doctor' && (
                  <Link 
                    to="/doctor/dashboard" 
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Doctor</span>
                  </Link>
                )}
                {user.role === 'user' && (
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                )}
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Register
                </Link>
                <Link
                  to="/doctor-register"
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Doctor Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link to="/doctors" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsOpen(false)}>
                Doctors
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
              
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-purple-600 hover:text-purple-700 font-semibold transition-colors" onClick={() => setIsOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  {user.role === 'doctor' && (
                    <Link to="/doctor/dashboard" className="text-green-600 hover:text-green-700 font-semibold transition-colors" onClick={() => setIsOpen(false)}>
                      Doctor Dashboard
                    </Link>
                  )}
                  {user.role === 'user' && (
                    <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={() => setIsOpen(false)}>
                      Dashboard
                    </Link>
                  )}
                  <div className="text-gray-700 flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{user.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                  <Link
                    to="/doctor-register"
                    className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Doctor Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
