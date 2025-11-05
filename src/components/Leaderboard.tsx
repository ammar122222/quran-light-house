import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, Award, Sparkles } from "lucide-react";

interface User {
  id: number;
  name: string;
  juz: number;
  surah: number;
  ayah: number;
  avatar?: string;
}

const mockUsers: User[] = [
  { id: 1, name: "Fatima", juz: 30, surah: 114, ayah: 6 },
  { id: 2, name: "Ahmed", juz: 28, surah: 109, ayah: 3 },
  { id: 3, name: "Yusuf", juz: 25, surah: 95, ayah: 8 },
  { id: 4, name: "Maryam", juz: 22, surah: 85, ayah: 12 },
  { id: 5, name: "Ibrahim", juz: 20, surah: 75, ayah: 5 },
];

const Leaderboard = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);

  useEffect(() => {
    const updateLeaderboard = () => {
      const myEntry = localStorage.getItem("myLeaderboardEntry");
      if (myEntry) {
        const entry = JSON.parse(myEntry);
        const newUser: User = {
          id: 999,
          name: entry.name || "You",
          juz: entry.juz || 0,
          surah: entry.surah || 1,
          ayah: entry.ayah || 1,
          avatar: entry.avatar,
        };
        
        const filtered = mockUsers.filter(u => u.id !== 999);
        const updated = [...filtered, newUser].sort((a, b) => {
          if (b.juz !== a.juz) return b.juz - a.juz;
          if (b.surah !== a.surah) return b.surah - a.surah;
          return b.ayah - a.ayah;
        });
        
        setUsers(updated);
      }
    };

    updateLeaderboard();
    window.addEventListener("storage", updateLeaderboard);
    return () => window.removeEventListener("storage", updateLeaderboard);
  }, []);

  return (
    <section className="py-20 px-6 bg-background" aria-labelledby="leaderboard-title">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <Trophy className="w-12 h-12 text-primary" aria-hidden="true" />
          </div>
          <h2 id="leaderboard-title" className="text-3xl font-bold mb-2 text-foreground">
            Global Leaderboard 🏆
          </h2>
          <p className="text-muted-foreground">
            See who's lighting up the path with noor!
          </p>
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <div className="space-y-4">
              {users.map((user, index) => (
                <LeaderboardRow key={user.id} user={user} rank={index + 1} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

const LeaderboardRow = ({ user, rank }: { user: User; rank: number }) => {
  const isChampion = rank === 1;
  const isTopThree = rank <= 3;

  return (
    <div 
      className={`flex items-center justify-between p-4 rounded-lg transition-all ${
        isChampion 
          ? 'bg-primary/10 border-2 border-primary animate-glow-pulse' 
          : isTopThree 
          ? 'bg-secondary/10 border border-secondary/30' 
          : 'bg-muted/30 border border-border hover:border-primary/30'
      }`}
      role="listitem"
      aria-label={`Rank ${rank}: ${user.name} with ${user.juz} Juz, Surah ${user.surah}, Ayah ${user.ayah}`}
    >
      {/* Left side: Rank + Avatar + Name */}
      <div className="flex items-center gap-3 flex-1">
        <span className="text-lg font-bold text-muted-foreground min-w-[2rem]">
          #{rank}
        </span>
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar} alt={`${user.name}'s avatar`} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="font-semibold text-foreground">{user.name}</span>
      </div>

      {/* Right side: Stats */}
      <div className="text-right">
        <div className="text-2xl font-bold text-foreground">
          {user.juz} Juz
        </div>
        <div className="text-sm text-muted-foreground">
          Surah {user.surah}, Ayah {user.ayah}
        </div>
      </div>

      {/* Crown for champion */}
      {isChampion && (
        <Crown 
          className="w-6 h-6 text-primary ml-2 animate-crown-float" 
          aria-label="Champion crown"
        />
      )}
      
      {/* Award for top 3 */}
      {isTopThree && !isChampion && (
        <Award 
          className="w-5 h-5 text-secondary ml-2" 
          aria-label="Top 3 award"
        />
      )}

      {/* Sparkles for champion */}
      {isChampion && (
        <Sparkles 
          className="w-5 h-5 text-primary ml-1 animate-shimmer" 
          aria-label="Excellence"
        />
      )}
    </div>
  );
};

const Trophy = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export default Leaderboard;
