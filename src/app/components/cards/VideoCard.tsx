import { VideoProject } from '@/app/types/cms';
import { StatusBadge } from '@/app/components/ui/status-badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { User, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface VideoCardProps {
  video: VideoProject;
  onStatusChange: (status: VideoProject['status']) => void;
}

const statusOptions: VideoProject['status'][] = ['draft', 'editing', 'review', 'final'];

export const VideoCard = ({ video, onStatusChange }: VideoCardProps) => {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-soft border border-border/50 transition-all duration-200 hover:shadow-medium animate-fade-in">
      <div 
        className="h-24 flex items-center justify-center"
        style={{ backgroundColor: video.thumbnailColor }}
      >
        <span className="text-4xl">🎬</span>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-medium text-foreground text-sm leading-tight">{video.title}</h3>
          <StatusBadge status={video.status} />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <User className="w-3.5 h-3.5" />
            {video.assignee}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            Due {format(video.dueDate, 'MMM d, yyyy')}
          </div>
        </div>

        <Select value={video.status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full h-9 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status} className="text-xs">
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
