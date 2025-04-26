
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Recipe } from '@/lib/data';

interface RecipeCardProps {
  recipe: Recipe;
  size?: 'sm' | 'md' | 'lg';
}

const RecipeCard = ({ recipe, size = 'md' }: RecipeCardProps) => {
  const imageHeight = size === 'sm' ? 'h-32' : size === 'md' ? 'h-48' : 'h-64';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl';

  return (
    <Link to={`/recipe/${recipe.id}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 h-full hover:shadow-md">
        <div className={`relative ${imageHeight} overflow-hidden`}>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-herb-500 hover:bg-herb-600">
              {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
            </Badge>
          </div>
        </div>
        
        <CardContent className="pt-4">
          <h3 className={`${titleSize} font-display font-medium mb-2 line-clamp-2`}>
            {recipe.title}
          </h3>
          
          {size !== 'sm' && (
            <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
              {recipe.description}
            </p>
          )}
        </CardContent>
        
        <CardFooter className="pt-0 pb-4 flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center">
            <User size={14} className="mr-1" />
            <span>{recipe.servings}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RecipeCard;
