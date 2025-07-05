import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Games from "./pages/Games";
import Journal from "./pages/Journal";
import Community from "./pages/Community";
import Reels from "./pages/Reels";
import LipReading from "./pages/games/LipReading";
import EscapeRoom from "./pages/games/EscapeRoom";
import VisualRiddles from "./pages/games/VisualRiddles";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="games" element={<Games />} />
            <Route path="journal" element={<Journal />} />
            <Route path="community" element={<Community />} />
            <Route path="reels" element={<Reels />} />
            <Route path="games/lip-reading" element={<LipReading />} />
            <Route path="games/escape-room" element={<EscapeRoom />} />
            <Route path="games/visual-riddles" element={<VisualRiddles />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
