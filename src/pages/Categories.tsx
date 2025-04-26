
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { recipes, categories, getRecipesByCategory, getFavoriteRecipes } from '@/lib/data';
import RecipeCard from '@/components/RecipeCard';

const Categories = () => {
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const filterFavorites = searchParams.get('filter') === 'favorite';
  
  const [activeCategory, setActiveCategory] = useState(categoryId || 'all');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      setFilteredRecipes(
        recipes.filter(recipe => 
          recipe.title.toLowerCase().includes(query) || 
          recipe.description.toLowerCase().includes(query) ||
          recipe.ingredients.some(ing => ing.toLowerCase().includes(query))
        )
      );
      return;
    }
    
    if (filterFavorites) {
      setFilteredRecipes(getFavoriteRecipes());
      return;
    }
    
    if (activeCategory === 'all') {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(getRecipesByCategory(activeCategory));
    }
  }, [activeCategory, searchQuery, filterFavorites]);

  return (
    <div className="container-custom py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
          {searchQuery 
            ? `Search results for "${searchQuery}"` 
            : filterFavorites
              ? 'Your Favorite Recipes'
              : 'All Recipes'}
        </h1>
        {searchQuery && (
          <p className="text-muted-foreground">
            Found {filteredRecipes.length} recipes matching your search
          </p>
        )}
      </div>
      
      {!searchQuery && !filterFavorites && (
        <Tabs defaultValue={activeCategory} className="mb-8">
          <TabsList className="overflow-x-auto whitespace-nowrap py-1 px-0 w-full bg-transparent border-b">
            <TabsTrigger 
              value="all" 
              className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-savor-500 rounded-none"
              onClick={() => setActiveCategory('all')}
            >
              All
            </TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-savor-500 rounded-none"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
      
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-xl font-display font-medium mb-3">No recipes found</h2>
          {searchQuery && (
            <p className="text-muted-foreground mb-6">
              We couldn't find any recipes matching "{searchQuery}"
            </p>
          )}
          <Button asChild>
            <a href="/categories">Browse All Recipes</a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Categories;
