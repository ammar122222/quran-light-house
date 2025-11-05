import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, User } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeroProps {
  user: User | null;
}

const Hero = ({ user }: HeroProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      toast({
        title: "Welcome! 🌟",
        description: `Signed in as ${result.user.displayName}`,
      });
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "Please add your domain to Firebase Console under Authentication > Settings > Authorized domains",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast({
        title: "Signed out",
        description: "Come back soon!",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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
        {/* User Profile Header */}
        {user && (
          <div className="absolute top-4 right-4 flex items-center gap-3 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border border-primary/20">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
              <AvatarFallback>{user.displayName?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground hidden sm:inline">
              {user.displayName}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="h-8 w-8 p-0"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Greeting */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-primary animate-glow-pulse" aria-hidden="true" />
          <p className="text-primary font-medium" role="banner">
            {user ? `As-salamu alaikum, ${user.displayName?.split(' ')[0]}` : "As-salamu alaikum"}
          </p>
          <Sparkles className="w-5 h-5 text-primary animate-glow-pulse" aria-hidden="true" />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-shine bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
          Noor Journey
        </h1>
        
        <p className="text-sm md:text-base text-muted-foreground mb-6 italic">
          for Qurayshi Family
        </p>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto">
          Every heart deserves to hold the Quran.
        </p>
        
        <p className="text-lg text-foreground/80 mb-8 max-w-xl mx-auto">
          Track your hifz with light, love, and celebration — accessible for all souls.
        </p>

        {/* Quranic Quote */}
        <div className="mb-12 max-w-3xl mx-auto p-6 bg-card/50 border border-primary/30 rounded-lg backdrop-blur-sm">
          <p className="text-lg text-foreground italic mb-2 font-amiri">
            "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ"
          </p>
          <p className="text-base text-foreground/90 mb-3">
            "The best among you are those who learn the Quran and teach it."
          </p>
          <p className="text-sm text-muted-foreground">
            — Prophet Muhammad ﷺ (Sahih al-Bukhari)
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {!user ? (
            <Button 
              size="lg" 
              onClick={handleGoogleSignIn}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow transition-all hover:scale-105 font-semibold px-8"
              aria-label="Sign in with Google"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>
          ) : (
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate("/profile")}
              className="border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary transition-all hover:scale-105 font-semibold px-8"
              aria-label="View your profile"
            >
              <BookOpen className="mr-2 h-5 w-5" aria-hidden="true" />
              My Progress
            </Button>
          )}
        </div>

        {/* Additional Hadith */}
        <div className="mt-16 max-w-2xl mx-auto p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
          <p className="text-sm text-foreground/80 italic">
            "Whoever recites the Quran and masters it by heart, will be with the noble righteous scribes (in Heaven)."
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            — Prophet Muhammad ﷺ (Sahih al-Bukhari)
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
