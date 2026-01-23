import { Link } from 'react-router-dom';

const Header = ({ showNewButton = false }) => {
  return (
    <header className="bg-white border-b border-luxury-beige shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-3xl font-serif text-luxury-charcoal tracking-tight">
              Quiet Luxury
            </h1>
            <p className="text-sm text-luxury-taupe mt-1">
              Reviews & Discoveries
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

