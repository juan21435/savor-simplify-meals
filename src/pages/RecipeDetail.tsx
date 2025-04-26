
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Check, Category } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getRecipeById } from '@/lib/data';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const recipe = id ? getRecipeById(id) : undefined;
  
  if (!recipe) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-display font-bold mb-4">Recipe not found</h2>
        <p className="mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/categories">Browse Recipes</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-muted/30 min-h-screen pb-16">
      {/* Hero image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      
      {/* Main content */}
      <div className="container-custom relative -mt-20">
        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8">
            {/* Recipe header */}
            <div className="mb-8">
              <Badge variant="secondary" className="mb-4 bg-herb-500 hover:bg-herb-600">
                {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">{recipe.title}</h1>
              <p className="text-muted-foreground mb-6">{recipe.description}</p>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <Clock size={18} className="mr-2 text-savor-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Prep time</p>
                    <p className="font-medium">{recipe.prepTime} mins</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="mr-2 text-savor-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cook time</p>
                    <p className="font-medium">{recipe.cookTime} mins</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <User size={18} className="mr-2 text-savor-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Servings</p>
                    <p className="font-medium">{recipe.servings}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            {/* Recipe content */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Ingredients */}
              <div>
                <h2 className="text-xl font-display font-semibold mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center bg-savor-100 rounded-full p-1 mr-3 mt-0.5">
                        <Check size={12} className="text-savor-700" />
                      </span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Instructions */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-display font-semibold mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-savor-500 text-white flex items-center justify-center mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            
            <div className="mt-12 flex justify-between">
              <Button asChild variant="outline">
                <Link to="/categories">Back to Recipes</Link>
              </Button>
              <div className="space-x-3">
                <Button variant="outline" className="border-tomato-500 text-tomato-500 hover:bg-tomato-50">
                  Add to Favorites
                </Button>
                <Button className="bg-herb-600 hover:bg-herb-700">
                  Add to Meal Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecipeDetail;
