import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import Leaderboard from "@/components/Leaderboard";
import AccessibilityFeatures from "@/components/AccessibilityFeatures";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Dashboard />
      <Leaderboard />
      <AccessibilityFeatures />
    </div>
  );
};

export default Index;
