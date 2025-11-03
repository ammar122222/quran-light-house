import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Trophy } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Radial glow background */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      
      {/* Subtle geometric pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%23d4af37' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container relative z-10 px-6 text-center animate-fade-in">
        {/* Greeting */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-primary animate-glow-pulse" aria-hidden="true" />
          <p className="text-primary font-medium" role="banner">
            As-salamu alaikum
          </p>
          <Sparkles className="w-5 h-5 text-primary animate-glow-pulse" aria-hidden="true" />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-shine bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
          Noor Journey
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto">
          Every heart deserves to hold the Quran.
        </p>
        
        <p className="text-lg text-foreground/80 mb-12 max-w-xl mx-auto">
          Track your hifz with light, love, and celebration — accessible for all souls.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all hover:scale-105 font-semibold px-8"
            aria-label="Start your Quran memorization journey"
          >
            <BookOpen className="mr-2 h-5 w-5" aria-hidden="true" />
            Begin Your Journey
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary transition-all hover:scale-105 font-semibold px-8"
            aria-label="View global leaderboard"
          >
            <Trophy className="mr-2 h-5 w-5" aria-hidden="true" />
            View Leaderboard
          </Button>
        </div>

        {/* Features preview */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <FeatureCard 
            icon={<BookOpen className="w-8 h-8" />}
            title="Live Progress"
            description="Beautiful circular Juz tracker with real-time updates"
          />
          <FeatureCard 
            icon={<Trophy className="w-8 h-8" />}
            title="Global Leaderboard"
            description="Celebrate achievements with animated crowns & badges"
          />
          <FeatureCard 
            icon={<Sparkles className="w-8 h-8" />}
            title="Fully Accessible"
            description="Screen readers, high contrast, voice commands & more"
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <div 
      className="p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:shadow-glow group"
      role="article"
      aria-labelledby={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="text-primary mb-4 group-hover:animate-glow-pulse" aria-hidden="true">
        {icon}
      </div>
      <h3 
        id={`feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-lg font-semibold mb-2 text-foreground"
      >
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default Hero;
