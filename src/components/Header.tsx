
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, ShoppingCart, Book, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="glass-morphism sticky top-0 z-50 border-b border-white/10">
      <div className="container-custom py-3">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-primary/20 text-primary p-1.5 rounded-md">
              <Book size={isMobile ? 18 : 20} />
            </span>
            <h1 className="text-lg md:text-xl font-display font-semibold text-foreground">PMS</h1>
          </Link>
          
          {!isMobile && (
            <div className="flex-1 max-w-xl">
              <SearchBar />
            </div>
          )}
          
          <nav className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size={isMobile ? "sm" : "icon"} className="text-muted-foreground hover:text-foreground hover:bg-secondary">
                <Home size={isMobile ? 16 : 18} />
              </Button>
            </Link>
            {!isMobile && (
              <>
                <Link to="/schedule">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary">
                    <Calendar size={18} />
                  </Button>
                </Link>
                <Link to="/shopping">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary">
                    <ShoppingCart size={18} />
                  </Button>
                </Link>
              </>
            )}
            {isMobile && (
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-secondary">
                <Search size={16} />
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
