import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Save } from "lucide-react";

interface ProgressData {
  juz: number;
  surah: number;
  ayah: number;
}

const ProgressSelector = () => {
  const { toast } = useToast();
  const [progress, setProgress] = useState<ProgressData>({
    juz: 0,
    surah: 1,
    ayah: 1,
  });

  useEffect(() => {
    const saved = localStorage.getItem("quranProgress");
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("quranProgress", JSON.stringify(progress));
    
    // Update leaderboard
    const profile = JSON.parse(localStorage.getItem("userProfile") || "{}");
    const leaderboardEntry = {
      name: profile.username || "Anonymous",
      avatar: profile.photoUrl || "",
      ...progress,
      timestamp: Date.now(),
    };
    localStorage.setItem("myLeaderboardEntry", JSON.stringify(leaderboardEntry));
    
    // Trigger storage event for leaderboard update
    window.dispatchEvent(new Event("storage"));

    toast({
      title: "Progress Updated! 🌟",
      description: `Juz ${progress.juz}, Surah ${progress.surah}, Ayah ${progress.ayah}`,
    });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-foreground">
          <BookOpen className="w-5 h-5 text-primary" />
          Update Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="juz">Juz</Label>
            <Input
              id="juz"
              type="number"
              min="0"
              max="30"
              value={progress.juz}
              onChange={(e) => setProgress({ ...progress, juz: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="surah">Surah</Label>
            <Input
              id="surah"
              type="number"
              min="1"
              max="114"
              value={progress.surah}
              onChange={(e) => setProgress({ ...progress, surah: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ayah">Ayah</Label>
            <Input
              id="ayah"
              type="number"
              min="1"
              value={progress.ayah}
              onChange={(e) => setProgress({ ...progress, ayah: Number(e.target.value) })}
            />
          </div>
        </div>
        <Button
          onClick={handleSave}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Progress
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProgressSelector;
