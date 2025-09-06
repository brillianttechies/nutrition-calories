import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Simple mobile device check
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Only enable if mobile AND "?debug" is in the URL
    if (isMobile && window.location.search.includes("debug")) {
      const script = document.createElement("script");
      script.src = "//cdn.jsdelivr.net/npm/eruda";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const w = window as any; // tell TS to ignore types
        if (w.eruda) {
          w.eruda.init();
          console.log("✅ Eruda Dev Console Enabled on Mobile");

          // Auto-open the Network tab (optional)
          const network = w.eruda.get("network");
          if (network) network.show();
        }
      };
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
