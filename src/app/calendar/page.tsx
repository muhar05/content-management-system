'use client';

import { useState } from "react";
import { useCMS } from "@/app/context/CMSContext";
import { StatusBadge } from "@/app/components/ui/status-badge";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Input } from "@/app/components/ui/input";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isSameDay,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  Youtube,
  Instagram,
} from "lucide-react";
import { toast } from "sonner";

const UploadCalendar = () => {
  const { uploads, videos, addUploadSlot } = useCMS();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newUpload, setNewUpload] = useState<{
    videoId: string;
    platform: "youtube" | "tiktok" | "instagram";
  }>({
    videoId: "",
    platform: "youtube",
  });

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getUploadsForDay = (date: Date) =>
    uploads.filter((u) => isSameDay(new Date(u.scheduledDate), date));

  const finalVideos = videos.filter(
    (v) => v.status === "final" || v.status === "review"
  );

  const handleAddUpload = () => {
    if (!selectedDate || !newUpload.videoId) return;

    const video = videos.find((v) => v.id === newUpload.videoId);
    if (!video) return;

    addUploadSlot({
      videoId: newUpload.videoId,
      title: video.title,
      scheduledDate: selectedDate,
      platform: newUpload.platform,
      status: "scheduled",
    });

    toast.success("Upload scheduled!", {
      description: `"${video.title}" scheduled for ${format(
        selectedDate,
        "MMM d"
      )}`,
    });

    setDialogOpen(false);
    setNewUpload({ videoId: "", platform: "youtube" });
  };

  const platformIcon = (platform: string) => {
    switch (platform) {
      case "youtube":
        return <Youtube className="w-3 h-3" />;
      case "instagram":
        return <Instagram className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const scheduledCount = uploads.filter((u) => u.status === "scheduled").length;
  const uploadedCount = uploads.filter((u) => u.status === "uploaded").length;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Upload Calendar
          </h1>
          <p className="text-muted-foreground mt-1">
            Plan and track your content publishing schedule
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">
              Scheduled ({scheduledCount})
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-muted-foreground">
              Uploaded ({uploadedCount})
            </span>
          </div>
        </div>
      </div>

      <div className="bg-accent/50 rounded-xl p-4 border border-primary/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium text-primary">Content Planner</p>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {scheduledCount > 0
            ? `${scheduledCount} uploads scheduled this month. Consider spacing uploads 2-3 days apart for optimal engagement.`
            : "No uploads scheduled yet. Start by selecting a date and scheduling your finished videos."}
        </p>
      </div>

      <div className="bg-card rounded-xl shadow-soft border border-border/50 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setCurrentMonth(
                  (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1)
                )
              }
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setCurrentMonth(
                  (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1)
                )
              }
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-b border-border">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-3 text-center text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="p-3 min-h-[120px] bg-muted/30" />
          ))}

          {days.map((day) => {
            const dayUploads = getUploadsForDay(day);
            const isCurrentDay = isToday(day);

            return (
              <Dialog
                key={day.toISOString()}
                open={
                  dialogOpen &&
                  selectedDate?.toISOString() === day.toISOString()
                }
                onOpenChange={setDialogOpen}
              >
                <DialogTrigger asChild>
                  <button
                    onClick={() => setSelectedDate(day)}
                    className={`p-3 min-h-[120px] border-r border-b border-border text-left hover:bg-accent/50 transition-colors ${
                      isCurrentDay ? "bg-primary/5" : ""
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${
                        isCurrentDay ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {format(day, "d")}
                    </span>

                    <div className="mt-2 space-y-1">
                      {dayUploads.slice(0, 2).map((upload) => (
                        <div
                          key={upload.id}
                          className={`text-xs p-1.5 rounded flex items-center gap-1 ${
                            upload.status === "uploaded"
                              ? "bg-success/10 text-success"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {platformIcon(upload.platform)}
                          <span className="truncate">{upload.title}</span>
                        </div>
                      ))}
                      {dayUploads.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{dayUploads.length - 2} more
                        </span>
                      )}
                    </div>
                  </button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Schedule Upload - {format(day, "MMMM d, yyyy")}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 pt-4">
                    {dayUploads.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          Already scheduled:
                        </p>
                        {dayUploads.map((upload) => (
                          <div
                            key={upload.id}
                            className="flex items-center justify-between p-3 bg-muted rounded-lg"
                          >
                            <div className="flex items-center gap-2">
                              {platformIcon(upload.platform)}
                              <span className="text-sm">{upload.title}</span>
                            </div>
                            <StatusBadge status={upload.status} />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="border-t border-border pt-4">
                      <p className="text-sm font-medium text-foreground mb-3">
                        Add new upload:
                      </p>

                      <div className="space-y-3">
                        <Select
                          value={newUpload.videoId}
                          onValueChange={(v) =>
                            setNewUpload((p) => ({ ...p, videoId: v }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a video" />
                          </SelectTrigger>
                          <SelectContent>
                            {finalVideos.length === 0 ? (
                              <div className="p-3 text-sm text-muted-foreground">
                                No videos ready for upload
                              </div>
                            ) : (
                              finalVideos.map((video) => (
                                <SelectItem key={video.id} value={video.id}>
                                  {video.title}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>

                        <Select
                          value={newUpload.platform}
                          onValueChange={(v) =>
                            setNewUpload((p) => ({
                              ...p,
                              platform: v as "youtube" | "tiktok" | "instagram",
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="youtube">YouTube</SelectItem>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="tiktok">TikTok</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button
                          onClick={handleAddUpload}
                          className="w-full gap-2"
                          disabled={!newUpload.videoId}
                        >
                          <Plus className="w-4 h-4" />
                          Schedule Upload
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UploadCalendar;
