export interface ContentIdea {
  id: string;
  title: string;
  description: string;
  votes: number;
  status: 'pending' | 'approved' | 'in-production' | 'rejected';
  aiFeedback: string;
  createdAt: Date;
  author: string;
}

export interface VideoProject {
  id: string;
  ideaId: string;
  title: string;
  status: 'draft' | 'editing' | 'review' | 'final';
  assignee: string;
  dueDate: Date;
  thumbnailColor: string;
}

export interface UploadSlot {
  id: string;
  videoId: string;
  title: string;
  scheduledDate: Date;
  platform: 'youtube' | 'tiktok' | 'instagram';
  status: 'scheduled' | 'uploaded' | 'pending';
}

export type AIAgent = 'reviewer' | 'planner' | 'monitor';

export interface AIResponse {
  agent: AIAgent;
  message: string;
}
