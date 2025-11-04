import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown, Award, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

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
  { id: 6, name: "Khadija", juz: 18, surah: 70, ayah: 2 },
  { id: 7, name: "Omar", juz: 16, surah: 62, ayah: 11 },
  { id: 8, name: "Aisha", juz: 15, surah: 58, ayah: 4 },
  { id: 9, name: "Ali", juz: 14, surah: 55, ayah: 78 },
  { id: 10, name: "Safiya", juz: 12, surah: 48, ayah: 29 },
  { id: 11, name: "Bilal", juz: 11, surah: 45, ayah: 37 },
  { id: 12, name: "Zaynab", juz: 10, surah: 42, ayah: 53 },
  { id: 13, name: "Hassan", juz: 9, surah: 39, ayah: 75 },
  { id: 14, name: "Ruqayyah", juz: 8, surah: 36, ayah: 83 },
  { id: 15, name: "Hamza", juz: 7, surah: 33, ayah: 73 },
  { id: 16, name: "Sumaya", juz: 6, surah: 30, ayah: 60 },
  { id: 17, name: "Uthman", juz: 5, surah: 27, ayah: 93 },
  { id: 18, name: "Asma", juz: 4, surah: 24, ayah: 64 },
  { id: 19, name: "Zaid", juz: 3, surah: 21, ayah: 112 },
  { id: 20, name: "Hafsa", juz: 2, surah: 18, ayah: 110 },
];

const Leaderboard = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const displayedUsers = isExpanded ? users : users.slice(0, 6);
  const hasMore = users.length > 6;

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
              {displayedUsers.map((user, index) => (
                <LeaderboardRow key={user.id} user={user} rank={index + 1} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="mr-2 h-4 w-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 h-4 w-4" />
                      Show All {users.length} Members
                    </>
                  )}
                </Button>
              </div>
            )}
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
