const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-luxury-beige mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-luxury-taupe">
              © {currentYear} Quiet Luxury. All rights reserved.
            </p>
            <p className="text-xs text-luxury-taupe mt-1 opacity-70">
              Curated reviews of timeless elegance
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="text-xs text-luxury-taupe hover:text-luxury-charcoal transition-colors"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="text-xs text-luxury-taupe hover:text-luxury-charcoal transition-colors"
            >
              Terms
            </a>
            <a 
              href="#" 
              className="text-xs text-luxury-taupe hover:text-luxury-charcoal transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

