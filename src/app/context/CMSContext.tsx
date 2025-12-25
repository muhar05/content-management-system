"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ContentIdea, VideoProject, UploadSlot } from "@/app/types/cms";

interface CMSContextType {
  ideas: ContentIdea[];
  videos: VideoProject[];
  uploads: UploadSlot[];
  addIdea: (
    idea: Omit<
      ContentIdea,
      "id" | "votes" | "status" | "aiFeedback" | "createdAt"
    >
  ) => void;
  voteIdea: (id: string) => void;
  promoteToProduction: (id: string) => void;
  updateVideoStatus: (id: string, status: VideoProject["status"]) => void;
  addUploadSlot: (slot: Omit<UploadSlot, "id">) => void;
}

const generateAIFeedback = (): string => {
  const feedbacks = [
    "Strong concept with viral potential. Consider adding a hook in the first 3 seconds.",
    "Aligns well with current trends. Recommend testing with a shorter format first.",
    "Unique angle, but may need simplified messaging for broader appeal.",
    "High engagement potential. Suggest A/B testing thumbnail styles.",
    "Good storytelling framework. Consider adding interactive elements.",
    "Timely topic. Fast-track recommended for algorithm boost.",
    "Creative approach, but ensure brand consistency throughout.",
    "Audience research suggests high interest. Prioritize quality over speed.",
  ];
  return feedbacks[Math.floor(Math.random() * feedbacks.length)];
};

const initialIdeas: ContentIdea[] = [
  {
    id: "1",
    title: "Behind the Scenes: Studio Tour",
    description:
      "A casual walkthrough of our creative space showing the team at work.",
    votes: 12,
    status: "approved",
    aiFeedback:
      "High authenticity score. Recommend scheduling during peak engagement hours.",
    createdAt: new Date("2024-01-10"),
    author: "Sarah Chen",
  },
  {
    id: "2",
    title: "5 Tips for Better Thumbnails",
    description:
      "Educational content breaking down thumbnail design principles.",
    votes: 8,
    status: "pending",
    aiFeedback:
      "Educational content performs well. Consider adding downloadable resources.",
    createdAt: new Date("2024-01-12"),
    author: "Mike Torres",
  },
  {
    id: "3",
    title: "Reacting to Fan Edits",
    description:
      "Community engagement video featuring the best fan submissions.",
    votes: 15,
    status: "in-production",
    aiFeedback:
      "Community content drives strong engagement. Plan follow-up content.",
    createdAt: new Date("2024-01-08"),
    author: "Alex Kim",
  },
];

const initialVideos: VideoProject[] = [
  {
    id: "v1",
    ideaId: "3",
    title: "Reacting to Fan Edits",
    status: "editing",
    assignee: "Jordan Lee",
    dueDate: new Date("2024-01-25"),
    thumbnailColor: "hsl(173 58% 45%)",
  },
  {
    id: "v2",
    ideaId: "1",
    title: "Behind the Scenes: Studio Tour",
    status: "review",
    assignee: "Casey Wong",
    dueDate: new Date("2024-01-22"),
    thumbnailColor: "hsl(199 89% 48%)",
  },
];

const initialUploads: UploadSlot[] = [
  {
    id: "u1",
    videoId: "v2",
    title: "Behind the Scenes: Studio Tour",
    scheduledDate: new Date("2024-01-24"),
    platform: "youtube",
    status: "scheduled",
  },
  {
    id: "u2",
    videoId: "v1",
    title: "Reacting to Fan Edits",
    scheduledDate: new Date("2024-01-28"),
    platform: "youtube",
    status: "pending",
  },
];

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [ideas, setIdeas] = useState<ContentIdea[]>(initialIdeas);
  const [videos, setVideos] = useState<VideoProject[]>(initialVideos);
  const [uploads, setUploads] = useState<UploadSlot[]>(initialUploads);

  const addIdea = (
    idea: Omit<
      ContentIdea,
      "id" | "votes" | "status" | "aiFeedback" | "createdAt"
    >
  ) => {
    const newIdea: ContentIdea = {
      ...idea,
      id: Date.now().toString(),
      votes: 0,
      status: "pending",
      aiFeedback: generateAIFeedback(),
      createdAt: new Date(),
    };
    setIdeas((prev) => [newIdea, ...prev]);
  };

  const voteIdea = (id: string) => {
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
      )
    );
  };

  const promoteToProduction = (id: string) => {
    const idea = ideas.find((i) => i.id === id);
    if (!idea) return;

    setIdeas((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "in-production" as const } : i
      )
    );

    const newVideo: VideoProject = {
      id: `v${Date.now()}`,
      ideaId: id,
      title: idea.title,
      status: "draft",
      assignee: "Unassigned",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      thumbnailColor: `hsl(${Math.random() * 360} 58% 45%)`,
    };
    setVideos((prev) => [...prev, newVideo]);
  };

  const updateVideoStatus = (id: string, status: VideoProject["status"]) => {
    setVideos((prev) =>
      prev.map((video) => (video.id === id ? { ...video, status } : video))
    );
  };

  const addUploadSlot = (slot: Omit<UploadSlot, "id">) => {
    const newSlot: UploadSlot = {
      ...slot,
      id: `u${Date.now()}`,
    };
    setUploads((prev) => [...prev, newSlot]);
  };

  return (
    <CMSContext.Provider
      value={{
        ideas,
        videos,
        uploads,
        addIdea,
        voteIdea,
        promoteToProduction,
        updateVideoStatus,
        addUploadSlot,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
};
