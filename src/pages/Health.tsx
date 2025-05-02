
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import HealthMetrics from '@/components/analytics/HealthMetrics';
import { useIsMobile } from '@/hooks/use-mobile';

const Health = () => {
  const isMobile = useIsMobile();

  return (
    <div className="container-custom py-6 md:py-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
              <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </Link>
          <h1 className={`font-display font-bold text-foreground ${isMobile ? 'text-2xl' : 'text-4xl'}`}>Health Dashboard</h1>
        </div>
      </div>
      
      <div className="animate-fade-in">
        <HealthMetrics />
      </div>
    </div>
  );
};

export default Health;
