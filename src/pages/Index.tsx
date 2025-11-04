import Hero from "@/components/Hero";
import Dashboard from "@/components/Dashboard";
import Leaderboard from "@/components/Leaderboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Dashboard />
      <Leaderboard />
    </div>
  );
};

export default Index;
