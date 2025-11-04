import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import Leaderboard from "@/components/Leaderboard";
import OnboardingTutorial from "@/components/OnboardingTutorial";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <OnboardingTutorial />
      <Hero />
      <Dashboard />
      <Leaderboard />
    </div>
  );
};

export default Index;
