import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FamilyMemberSelector from "@/components/FamilyMemberSelector";
import ProgressSelector from "@/components/ProgressSelector";
import ProgressAnalytics from "@/components/ProgressAnalytics";

import { useAuth } from "@/hooks/useAuth";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [authenticatedMember, setAuthenticatedMember] = useState<string | null>(null);

  const handleAuthenticated = (memberName: string) => {
    setAuthenticatedMember(memberName);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container max-w-6xl mx-auto py-8 px-6 relative z-10">
        <Button
          variant="ghost"
          onClick={() => {
            setAuthenticatedMember(null);
            navigate("/");
          }}
          className="mb-8 hover:bg-primary/10 transition-all"
          aria-label="Go back to dashboard"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        {!authenticatedMember ? (
          <FamilyMemberSelector onAuthenticated={handleAuthenticated} />
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Welcome Header */}
            <Card className="bg-gradient-to-br from-card via-card/95 to-card/80 border-2 border-primary/30 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
              <CardHeader className="pb-8">
                <CardTitle className="text-4xl font-bold text-foreground flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full border border-primary/30">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground font-normal mb-1">As-salamu alaikum,</div>
                    {authenticatedMember}
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Progress Input */}
            <ProgressSelector selectedMember={authenticatedMember} />

            {/* Analytics Dashboard */}
            <ProgressAnalytics />

            {/* Switch Member Button */}
            <Button
              variant="outline"
              onClick={() => setAuthenticatedMember(null)}
              className="w-full border-2 border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-all text-lg py-6"
            >
              Switch Family Member
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
