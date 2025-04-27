
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Dumbbell, Wallet, Activity, ChartBar, ShoppingCart, Book } from 'lucide-react';

const navigationItems = [
  {
    icon: Calendar,
    label: 'Schedule',
    path: '/schedule',
    description: 'Plan your meals and activities'
  },
  {
    icon: Dumbbell,
    label: 'Exercise',
    path: '/exercise',
    description: 'Track workouts and progress'
  },
  {
    icon: Wallet,
    label: 'Finance',
    path: '/finance',
    description: 'Manage expenses and budgets'
  },
  {
    icon: Activity,
    label: 'Health',
    path: '/health',
    description: 'Monitor health metrics'
  },
  {
    icon: ChartBar,
    label: 'Analytics',
    path: '/analytics',
    description: 'View insights and trends'
  },
  {
    icon: ShoppingCart,
    label: 'Shopping',
    path: '/shopping',
    description: 'Manage shopping lists'
  },
  {
    icon: Book,
    label: 'Journal',
    path: '/journal',
    description: 'Personal notes and reflections'
  }
];

const Navigation = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {navigationItems.map((item) => (
        <Link key={item.path} to={item.path} className="group">
          <div className="glass-morphism aspect-square p-6 flex flex-col items-center justify-center gap-4 transition-all duration-200 hover:scale-105">
            <item.icon className="w-12 h-12 text-primary transition-colors group-hover:text-accent" />
            <div className="text-center">
              <h3 className="font-display font-medium text-lg">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
