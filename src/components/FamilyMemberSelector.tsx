import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const FAMILY_MEMBERS = [
  "Bilal Qureshi",
  "Umar Qureshi",
  "Abdullah Qureshi",
  "Abir Qureshi",
  "Ammar Qureshi",
  "Arif Qureshi",
  "Hoorab",
  "Amna",
  "Lareb",
  "Mama",
];

interface FamilyMemberSelectorProps {
  onAuthenticated: (memberName: string) => void;
}

const FamilyMemberSelector = ({ onAuthenticated }: FamilyMemberSelectorProps) => {
  const { toast } = useToast();
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [isSettingPin, setIsSettingPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState<string>("");

  const getPinKey = (memberName: string) => `pin_${memberName.replace(/\s+/g, "_")}`;

  const handleAuthenticate = () => {
    if (!selectedMember) {
      toast({
        title: "Please select a family member",
        variant: "destructive",
      });
      return;
    }

    const pinKey = getPinKey(selectedMember);
    const storedPin = localStorage.getItem(pinKey);

    if (!storedPin) {
      setIsSettingPin(true);
      toast({
        title: "First Time Setup",
        description: `Please set a PIN for ${selectedMember}`,
      });
      return;
    }

    if (pin === storedPin) {
      toast({
        title: "Access Granted ✅",
        description: `Welcome, ${selectedMember}!`,
      });
      onAuthenticated(selectedMember);
    } else {
      toast({
        title: "Invalid PIN ❌",
        description: "Please try again.",
        variant: "destructive",
      });
      setPin("");
    }
  };

  const handleSetPin = () => {
    if (pin.length < 4) {
      toast({
        title: "PIN too short",
        description: "Please use at least 4 digits",
        variant: "destructive",
      });
      return;
    }

    if (pin !== confirmPin) {
      toast({
        title: "PINs don't match",
        description: "Please make sure both PINs are the same",
        variant: "destructive",
      });
      return;
    }

    const pinKey = getPinKey(selectedMember);
    localStorage.setItem(pinKey, pin);
    
    toast({
      title: "PIN Set Successfully! 🔐",
      description: `PIN created for ${selectedMember}`,
    });

    onAuthenticated(selectedMember);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-foreground">
          <Users className="w-5 h-5 text-primary" />
          Select Family Member
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="member">Family Member</Label>
          <Select value={selectedMember} onValueChange={setSelectedMember}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a family member" />
            </SelectTrigger>
            <SelectContent>
              {FAMILY_MEMBERS.map((member) => (
                <SelectItem key={member} value={member}>
                  {member}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedMember && (
          <>
            <div className="space-y-2">
              <Label htmlFor="pin" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                {isSettingPin ? "Create PIN" : "Enter PIN"}
              </Label>
              <Input
                id="pin"
                type="password"
                placeholder={isSettingPin ? "Create a PIN (min 4 digits)" : "Enter your PIN"}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={8}
              />
            </div>

            {isSettingPin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPin">Confirm PIN</Label>
                <Input
                  id="confirmPin"
                  type="password"
                  placeholder="Confirm your PIN"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  maxLength={8}
                />
              </div>
            )}

            <Button
              onClick={isSettingPin ? handleSetPin : handleAuthenticate}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Lock className="mr-2 h-4 w-4" />
              {isSettingPin ? "Set PIN" : "Authenticate"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FamilyMemberSelector;
