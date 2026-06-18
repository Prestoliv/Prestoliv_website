import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Process from "./pages/Process.tsx";
import OurServices from "./pages/OurServices.tsx";
import About from "./pages/About.tsx";
import AuthCallback from "./pages/AuthCallback.tsx";
import CommercialPage from "./pages/pages_services/CommercialPage.tsx";
import ResidentialPage from "./pages/pages_services/ResidentialPage.tsx";
import InteriorsPage from "./pages/pages_services/InteriorsPage.tsx";
import ConstructionCalculatorPage from "./pages/ConstructionCalculator.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { ContactSettingsProvider } from "@/components/ContactSettingsProvider";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { WhatsAppStickyButton } from "@/components/WhatsAppStickyButton";

const queryClient = new QueryClient();

const ScrollToTop = () => {
const { pathname } = useLocation();

useEffect(() => {
window.scrollTo(0, 0);
}, [pathname]);

return null;
};

const App = () => (
<QueryClientProvider client={queryClient}>
<TooltipProvider>
<Toaster />
<Sonner />
<BrowserRouter>
<ContactSettingsProvider>
<AnalyticsProvider>
<ScrollToTop />
<CookieConsentBanner />
<WhatsAppStickyButton />
<Routes>
<Route path="/" element={<Index />} />
<Route path="/process" element={<Process />} />
<Route path="/services" element={<OurServices />} />
<Route path="/calculator" element={<ConstructionCalculatorPage />} />
<Route path="/services/commercial" element={<CommercialPage />} />
<Route path="/services/residential" element={<ResidentialPage />} />
<Route path="/services/interiors" element={<InteriorsPage />} />
<Route path="/about" element={<About />} />
<Route path="/blog" element={<Blog />} />
<Route path="/blog/:slug" element={<BlogPost />} />
<Route path="/auth/callback" element={<AuthCallback />} />
{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
<Route path="*" element={<NotFound />} />
</Routes>
</AnalyticsProvider>
</ContactSettingsProvider>
</BrowserRouter>
</TooltipProvider>
</QueryClientProvider>
);

export default App;
