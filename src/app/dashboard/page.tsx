"use client";

import { useCMS } from "@/app/context/CMSContext";
import { StatCard } from "@/app/components/cards/StatCard";
import { StatusBadge } from "@/app/components/ui/status-badge";
import {
  Lightbulb,
  Video,
  Calendar,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

const Dashboard = () => {
  const { ideas, videos, uploads } = useCMS();

  const pendingIdeas = ideas.filter((i) => i.status === "pending").length;
  const inProductionVideos = videos.filter((v) => v.status !== "final").length;
  const scheduledUploads = uploads.filter(
    (u) => u.status === "scheduled"
  ).length;
  const topIdea = [...ideas].sort((a, b) => b.votes - a.votes)[0];

  const aiInsights = [
    {
      agent: "Content Planner",
      message:
        "Consider batching similar content for efficiency. 3 related ideas detected.",
    },
    {
      agent: "Progress Monitor",
      message: `${inProductionVideos} videos in pipeline. On track for weekly upload goal.`,
    },
    {
      agent: "Idea Reviewer",
      message: `"${topIdea?.title}" shows highest engagement potential based on voting.`,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your content workflow
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pending Ideas"
          value={pendingIdeas}
          subtitle="Awaiting review"
          icon={Lightbulb}
        />
        <StatCard
          title="In Production"
          value={inProductionVideos}
          subtitle="Active projects"
          icon={Video}
          trend="neutral"
        />
        <StatCard
          title="Scheduled"
          value={scheduledUploads}
          subtitle="Ready to publish"
          icon={Calendar}
          trend="up"
        />
        <StatCard
          title="Total Votes"
          value={ideas.reduce((sum, i) => sum + i.votes, 0)}
          subtitle="+12 this week"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-6 shadow-soft border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Recent Ideas</h2>
            <Link
              href="/ideas"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {ideas.slice(0, 4).map((idea) => (
              <div
                key={idea.id}
                className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">
                    {idea.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {idea.votes} votes • {idea.author}
                  </p>
                </div>
                <StatusBadge status={idea.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-soft border border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Production Status</h2>
            <Link
              href="/production"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                    style={{ backgroundColor: video.thumbnailColor }}
                  >
                    🎬
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {video.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {video.assignee}
                    </p>
                  </div>
                </div>
                <StatusBadge status={video.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-accent to-accent/50 rounded-xl p-6 border border-primary/10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-foreground">AI Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiInsights.map((insight, index) => (
            <div key={index} className="bg-card/80 rounded-lg p-4">
              <p className="text-xs font-medium text-primary mb-1">
                {insight.agent}
              </p>
              <p className="text-sm text-muted-foreground">{insight.message}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl p-6 shadow-soft border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Upcoming Uploads</h2>
          <Link
            href="/calendar"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View calendar <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uploads.map((upload) => (
            <div key={upload.id} className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <StatusBadge status={upload.status} />
                <span className="text-xs text-muted-foreground capitalize">
                  {upload.platform}
                </span>
              </div>
              <p className="font-medium text-foreground text-sm mb-1">
                {upload.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(upload.scheduledDate, "EEEE, MMM d")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
