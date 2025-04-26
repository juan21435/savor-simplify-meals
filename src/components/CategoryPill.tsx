
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/lib/data';

interface CategoryPillProps {
  category: Category;
}

const CategoryPill = ({ category }: CategoryPillProps) => {
  return (
    <Link
      to={`/categories/${category.id}`}
      className="relative group overflow-hidden rounded-lg aspect-square"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <h3 className="text-white font-display font-medium text-lg">
          {category.name}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryPill;
