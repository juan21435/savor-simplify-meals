import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, ShoppingCart, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';
const Header = () => {
  return <header className="bg-white shadow-sm">
      <div className="container-custom py-4 bg-slate-950">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="flex items-center gap-2 mb-4 md:mb-0">
            <span className="bg-savor-500 text-white p-1 rounded">
              <Book size={24} />
            </span>
            <h1 className="text-2xl font-display font-bold text-savor-700">Savor</h1>
          </Link>
          
          <div className="flex-1 max-w-md mx-4">
            <SearchBar />
          </div>
          
          <nav className="flex items-center gap-3">
            <Link to="/categories">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Book size={20} />
              </Button>
            </Link>
            <Link to="/meal-planner">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Calendar size={20} />
              </Button>
            </Link>
            <Link to="/shopping-list">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <ShoppingCart size={20} />
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>;
};
export default Header;