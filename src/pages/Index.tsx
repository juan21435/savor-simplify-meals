import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { categories, recipes, getFavoriteRecipes } from '@/lib/data';
import RecipeCard from '@/components/RecipeCard';
import CategoryPill from '@/components/CategoryPill';
const Index = () => {
  const featuredRecipes = recipes.slice(0, 3);
  const favoriteRecipes = getFavoriteRecipes().slice(0, 4);
  return <div className="min-h-screen bg-muted/30">
      {/* Hero section */}
      <section className="relative bg-cover bg-center h-80 md:h-96" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200)'
    }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="container-custom h-full flex items-center relative z-10">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 animate-fade-in">
              Your Personal Recipe Collection
            </h1>
            <p className="text-white/90 mb-6 animate-fade-in">
              Organize recipes, plan meals, and create shopping lists - all in one place.
            </p>
            <div className="flex gap-4 animate-fade-in">
              <Button asChild size="lg" className="bg-savor-500 hover:bg-savor-600">
                <Link to="/categories">Browse Recipes</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                <Link to="/meal-planner">Plan Meals</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold">Recipe Categories</h2>
            <Button asChild variant="ghost" className="text-savor-700 hover:text-savor-800">
              <Link to="/categories">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => <CategoryPill key={category.id} category={category} />)}
          </div>
        </div>
      </section>

      {/* Featured recipes section */}
      <section className="py-12 bg-zinc-950">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Featured Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} size="lg" />)}
          </div>
        </div>
      </section>

      {/* Your favorites section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold">Your Favorites</h2>
            <Button asChild variant="ghost" className="text-savor-700 hover:text-savor-800">
              <Link to="/categories?filter=favorite">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {favoriteRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} size="sm" />)}
          </div>
        </div>
      </section>
    </div>;
};
export default Index;