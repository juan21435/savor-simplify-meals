
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Schedule from "@/pages/Schedule";

const queryClient = new QueryClient();

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="container-custom py-12">
    <h1 className="text-4xl font-display font-bold text-foreground mb-6">{title}</h1>
    <p className="text-muted-foreground">This section is under development.</p>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <main className="container-custom py-12">
          <h1 className="text-4xl font-display font-bold text-foreground text-center mb-12">
            Personal Management System
          </h1>
          <Routes>
            <Route path="/" element={<Navigation />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/exercise" element={<PlaceholderPage title="Exercise" />} />
            <Route path="/finance" element={<PlaceholderPage title="Finance" />} />
            <Route path="/health" element={<PlaceholderPage title="Health" />} />
            <Route path="/analytics" element={<PlaceholderPage title="Analytics" />} />
            <Route path="/shopping" element={<PlaceholderPage title="Shopping" />} />
            <Route path="/journal" element={<PlaceholderPage title="Journal" />} />
          </Routes>
        </main>
      </div>
      <Toaster />
      <Sonner />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
