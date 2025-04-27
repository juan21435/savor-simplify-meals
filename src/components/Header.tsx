
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, ShoppingCart, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header className="glass-morphism sticky top-0 z-50 border-b border-white/10">
      <div className="container-custom py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-primary/20 text-primary p-1.5 rounded-md">
              <Book size={20} />
            </span>
            <h1 className="text-xl font-display font-semibold text-foreground">Savor</h1>
          </Link>
          
          <div className="flex-1 max-w-xl">
            <SearchBar />
          </div>
          
          <nav className="flex items-center gap-2">
            <Link to="/categories">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary">
                <Book size={18} />
              </Button>
            </Link>
            <Link to="/meal-planner">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary">
                <Calendar size={18} />
              </Button>
            </Link>
            <Link to="/shopping-list">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-secondary">
                <ShoppingCart size={18} />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
