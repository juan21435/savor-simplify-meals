
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Dumbbell, Wallet, Activity, ChartBar, ShoppingCart, Book } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
    description: 'Audio & digital scrapbooking'
  }
];

const Navigation = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto animate-fade-in">
      {navigationItems.map((item) => (
        <Link key={item.path} to={item.path} className="group">
          <div className="glass-morphism aspect-square p-4 md:p-6 flex flex-col items-center justify-center gap-3 md:gap-4 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
            <item.icon className={`${isMobile ? 'w-8 h-8' : 'w-12 h-12'} text-primary transition-colors group-hover:text-accent`} />
            <div className="text-center">
              <h3 className="font-display font-medium text-base md:text-lg">{item.label}</h3>
              <p className={`text-xs md:text-sm text-muted-foreground ${isMobile ? 'line-clamp-2' : ''}`}>{item.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
