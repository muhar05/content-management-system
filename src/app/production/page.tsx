'use client';

import { useCMS } from "@/app/context/CMSContext";
import { VideoCard } from "@/app/components/cards/VideoCard";
import { VideoProject } from "@/app/types/cms";
import { toast } from "sonner";
import { Sparkles, FileVideo, Edit3, Eye, CheckCircle } from "lucide-react";

const statusColumns: {
  status: VideoProject["status"];
  label: string;
  icon: React.ElementType;
}[] = [
  { status: "draft", label: "Draft", icon: FileVideo },
  { status: "editing", label: "Editing", icon: Edit3 },
  { status: "review", label: "Review", icon: Eye },
  { status: "final", label: "Final", icon: CheckCircle },
];

const VideoProduction = () => {
  const { videos, updateVideoStatus } = useCMS();

  const handleStatusChange = (
    id: string,
    newStatus: VideoProject["status"]
  ) => {
    updateVideoStatus(id, newStatus);
    toast.success(`Status updated to ${newStatus}`);
  };

  const getVideosByStatus = (status: VideoProject["status"]) =>
    videos.filter((v) => v.status === status);

  const aiMonitorInsight =
    videos.length > 0
      ? `${videos.filter((v) => v.status === "final").length} of ${
          videos.length
        } videos completed. ${
          videos.filter((v) => v.status === "editing").length
        } in active editing.`
      : "No videos in production yet. Promote ideas to get started.";

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Video Production
        </h1>
        <p className="text-muted-foreground mt-1">
          Track and manage video project status
        </p>
      </div>

      <div className="bg-accent/50 rounded-xl p-4 border border-primary/10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-sm font-medium text-primary">Progress Monitor</p>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{aiMonitorInsight}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusColumns.map(({ status, label, icon: Icon }) => {
          const columnVideos = getVideosByStatus(status);

          return (
            <div key={status} className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <h3 className="font-medium text-foreground">{label}</h3>
                <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {columnVideos.length}
                </span>
              </div>

              <div className="space-y-4 min-h-[200px]">
                {columnVideos.length === 0 ? (
                  <div className="text-center py-8 text-sm text-muted-foreground border-2 border-dashed border-border rounded-lg">
                    No videos
                  </div>
                ) : (
                  columnVideos.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      onStatusChange={(newStatus) =>
                        handleStatusChange(video.id, newStatus)
                      }
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-16 bg-card rounded-xl border border-border/50">
          <FileVideo className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium text-foreground mb-2">
            No videos in production
          </h3>
          <p className="text-sm text-muted-foreground">
            Head to Content Ideas to promote ideas into production.
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoProduction;
