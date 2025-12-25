export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: "Admin" | "Editor" | "Viewer";
  avatar_url?: string;
  status: "active" | "inactive";
  created_at?: Date;
  updated_at?: Date;
}

export interface Idea {
  id: string;
  title: string;
  description?: string;
  author_id?: string;
  status: "draft" | "published" | "archived";
  created_at?: Date;
  updated_at?: Date;
  category: "Storytelling_Cinematic" | "SkitComedy" | "Monolog";
}

export interface Video {
  id: string;
  title: string;
  url: string;
  description?: string;
  uploaded_by?: string;
  created_at?: Date;
}

export interface Stat {
  id: string;
  name: string;
  value: number;
  related_to: "idea" | "video";
  created_at?: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  event_date: Date;
  created_by?: string;
  created_at?: Date;
}
