
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import HealthMetrics from '@/components/analytics/HealthMetrics';

const Health = () => {
  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-4xl font-display font-bold text-foreground">Health Dashboard</h1>
        </div>
      </div>
      
      <HealthMetrics />
    </div>
  );
};

export default Health;
