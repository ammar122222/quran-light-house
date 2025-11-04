import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Trophy, TrendingUp, ChevronRight } from "lucide-react";

const OnboardingTutorial = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const steps = [
    {
      icon: <BookOpen className="w-12 h-12 text-primary" />,
      title: "Welcome to Noor Journey! 🌟",
      description:
        "Track your Quran learning progress together as the Qurayshi family. Let's light up the path with noor!",
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Family Member Access",
      description:
        "Select your name from the family list and set up your personal PIN. This keeps everyone's progress secure and personalized.",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
      title: "Update Your Progress",
      description:
        "After authenticating, update how much you've learned - Juz, Surah, and Ayah. Your progress updates the leaderboard instantly!",
    },
    {
      icon: <Trophy className="w-12 h-12 text-primary" />,
      title: "Compete & Inspire",
      description:
        "See who's leading the race and motivate each other! Analytics show who needs encouragement and who's excelling.",
    },
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("hasSeenTutorial", "true");
      setIsOpen(false);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("hasSeenTutorial", "true");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">{currentStep.icon}</div>
          <DialogTitle className="text-center text-2xl">
            {currentStep.title}
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            {currentStep.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-2 my-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === step ? "bg-primary w-8" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSkip} className="flex-1">
            Skip
          </Button>
          <Button onClick={handleNext} className="flex-1">
            {step < steps.length - 1 ? (
              <>
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Get Started"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingTutorial;
