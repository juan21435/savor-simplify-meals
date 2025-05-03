
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Schedule from "@/pages/Schedule";
import Finance from "@/pages/Finance";
import ShoppingDashboard from "@/pages/ShoppingDashboard";
import Journal from "@/pages/Journal";
import Analytics from "@/pages/Analytics";
import Health from "@/pages/Health";
import { useIsMobile } from "@/hooks/use-mobile";

const queryClient = new QueryClient();

const PlaceholderPage = ({ title }: { title: string }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="container-custom py-8 md:py-12">
      <h1 className={`${isMobile ? "text-2xl" : "text-4xl"} font-display font-bold text-foreground mb-6`}>{title}</h1>
      <div className="glass-morphism p-6 rounded-xl">
        <p className="text-muted-foreground">This section is under development.</p>
      </div>
    </div>
  );
};

const App = () => {
  const isMobile = useIsMobile();
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <main className="container-custom py-6 md:py-12">
            <h1 className={`${isMobile ? "text-3xl" : "text-4xl"} font-display font-bold text-foreground text-center mb-8 md:mb-12 animate-fade-in`}>
              Personal Management System
            </h1>
            <Routes>
              <Route path="/" element={<Navigation />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/exercise" element={<PlaceholderPage title="Exercise" />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/health" element={<Health />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/shopping" element={<ShoppingDashboard />} />
              <Route path="/journal" element={<Journal />} />
            </Routes>
          </main>
        </div>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
