import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Square, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

interface VoiceRecorderProps {
  userId: string;
  userName: string;
}

const VoiceRecorder = ({ userId, userName }: VoiceRecorderProps) => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording started 🎤",
        description: "Recite your Quran passage",
      });
    } catch (error) {
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to record",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      
      toast({
        title: "Recording stopped ✅",
        description: "You can now upload your recitation",
      });
    }
  };

  const uploadRecording = async () => {
    if (!audioURL || !audioChunksRef.current.length) return;

    try {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      const timestamp = Date.now();
      const fileName = `recitations/${userId}/${userName}_${timestamp}.webm`;
      const storageRef = ref(storage, fileName);

      await uploadBytes(storageRef, audioBlob);
      const downloadURL = await getDownloadURL(storageRef);

      toast({
        title: "Recitation uploaded! 🌟",
        description: "Your recitation has been saved",
      });

      // Reset
      setAudioURL(null);
      audioChunksRef.current = [];
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2 text-foreground">
          <Mic className="w-5 h-5 text-primary" />
          Record Recitation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {!isRecording ? (
            <Button
              onClick={startRecording}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Mic className="mr-2 h-4 w-4" />
              Start Recording
            </Button>
          ) : (
            <Button
              onClick={stopRecording}
              variant="destructive"
              className="flex-1"
            >
              <Square className="mr-2 h-4 w-4" />
              Stop Recording
            </Button>
          )}
        </div>

        {audioURL && (
          <div className="space-y-2">
            <audio src={audioURL} controls className="w-full" />
            <Button
              onClick={uploadRecording}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Recitation
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceRecorder;
