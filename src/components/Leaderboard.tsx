import { Crown, Award, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: number;
  name: string;
  juzCompleted: number;
  avatar?: string;
}

const mockUsers: User[] = [
  { id: 1, name: "Fatima", juzCompleted: 28, avatar: "/placeholder.svg" },
  { id: 2, name: "Ahmed", juzCompleted: 25, avatar: "/placeholder.svg" },
  { id: 3, name: "Aisha", juzCompleted: 22, avatar: "/placeholder.svg" },
  { id: 4, name: "Omar", juzCompleted: 20, avatar: "/placeholder.svg" },
  { id: 5, name: "Khadija", juzCompleted: 18, avatar: "/placeholder.svg" },
];

const Leaderboard = () => {
  return (
    <section className="py-20 px-6">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Global Leaderboard
          </h2>
          <p className="text-muted-foreground">
            Celebrating our community's dedication
          </p>
        </div>

        <Card className="bg-card border-border shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Trophy className="text-primary" />
              Top Memorizers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4" role="list" aria-label="Top memorizers leaderboard">
              {mockUsers.map((user, index) => (
                <LeaderboardRow 
                  key={user.id} 
                  user={user} 
                  rank={index + 1} 
                />
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
      className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
        isChampion 
          ? 'bg-primary/10 border-2 border-primary shadow-crown' 
          : isTopThree 
          ? 'bg-secondary/10 border border-secondary/30' 
          : 'bg-muted/30 border border-border hover:border-primary/30'
      }`}
      role="listitem"
      aria-label={`Rank ${rank}: ${user.name} with ${user.juzCompleted} Juz completed`}
    >
      {/* Rank with special styling for top 3 */}
      <div className="flex-shrink-0 w-12 text-center">
        {isChampion ? (
          <Crown 
            className="w-8 h-8 text-primary animate-crown-float mx-auto" 
            aria-label="First place crown"
            role="img"
          />
        ) : isTopThree ? (
          <Award 
            className="w-6 h-6 text-secondary mx-auto" 
            aria-label={`${rank === 2 ? 'Second' : 'Third'} place medal`}
            role="img"
          />
        ) : (
          <span className="text-2xl font-bold text-muted-foreground">
            {rank}
          </span>
        )}
      </div>

      {/* Avatar */}
      <Avatar className="h-12 w-12">
        <AvatarImage src={user.avatar} alt={`${user.name}'s profile picture`} />
        <AvatarFallback className="bg-primary/20 text-primary font-semibold">
          {user.name.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {/* User info */}
      <div className="flex-grow">
        <p className="font-semibold text-foreground">{user.name}</p>
        <p className="text-sm text-muted-foreground">
          {user.juzCompleted} Juz completed
        </p>
      </div>

      {/* Achievement badge */}
      {isChampion && (
        <div className="flex items-center gap-1 text-primary text-sm font-semibold">
          <Sparkles className="w-4 h-4 animate-glow-pulse" aria-hidden="true" />
          <span>MashaAllah!</span>
        </div>
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
