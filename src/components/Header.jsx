import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Header = ({ showNewButton = false }) => {
  return (
    <header className="bg-white border-b border-luxury-beige shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="hover:opacity-80 transition-opacity flex items-center">
            <img 
              src={logo} 
              alt="Quiet Luxury" 
              className="h-12 w-auto"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

