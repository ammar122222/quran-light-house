import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FamilyMemberSelector from "@/components/FamilyMemberSelector";
import ProgressSelector from "@/components/ProgressSelector";
import ProgressAnalytics from "@/components/ProgressAnalytics";

const Profile = () => {
  const navigate = useNavigate();
  const [authenticatedMember, setAuthenticatedMember] = useState<string | null>(null);

  const handleAuthenticated = (memberName: string) => {
    setAuthenticatedMember(memberName);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="container max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => {
            setAuthenticatedMember(null);
            navigate("/");
          }}
          className="mb-6"
          aria-label="Go back to dashboard"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        {!authenticatedMember ? (
          <FamilyMemberSelector onAuthenticated={handleAuthenticated} />
        ) : (
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  Welcome, {authenticatedMember}!
                </CardTitle>
              </CardHeader>
            </Card>

            <ProgressSelector selectedMember={authenticatedMember} />

            <ProgressAnalytics />

            <Button
              variant="outline"
              onClick={() => setAuthenticatedMember(null)}
              className="w-full"
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
