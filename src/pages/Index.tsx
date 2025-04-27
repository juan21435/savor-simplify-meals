
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { categories, recipes, getFavoriteRecipes } from '@/lib/data';
import RecipeCard from '@/components/RecipeCard';
import CategoryPill from '@/components/CategoryPill';

const Index = () => {
  const featuredRecipes = recipes.slice(0, 3);
  const favoriteRecipes = getFavoriteRecipes().slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero section */}
      <section className="relative h-72 glass-morphism overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        <div className="container-custom h-full flex items-center relative z-10">
          <div className="max-w-lg">
            <h1 className="text-4xl font-display font-bold text-foreground mb-4 animate-fade-in">
              Your Personal Recipe Collection
            </h1>
            <p className="text-muted-foreground mb-6 animate-fade-in">
              Organize recipes, plan meals, and create shopping lists - all in one place.
            </p>
            <div className="flex gap-4 animate-fade-in">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/categories">Browse Recipes</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/meal-planner">Plan Meals</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories section */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-display font-semibold">Recipe Categories</h2>
            <Button asChild variant="ghost" className="text-primary hover:text-primary/90">
              <Link to="/categories">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => <CategoryPill key={category.id} category={category} />)}
          </div>
        </div>
      </section>

      {/* Featured recipes section */}
      <section className="py-8 glass-morphism border-y border-white/10">
        <div className="container-custom">
          <h2 className="text-xl font-display font-semibold mb-6">Featured Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} size="lg" />)}
          </div>
        </div>
      </section>

      {/* Your favorites section */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-display font-semibold">Your Favorites</h2>
            <Button asChild variant="ghost" className="text-primary hover:text-primary/90">
              <Link to="/categories?filter=favorite">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {favoriteRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} size="sm" />)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
