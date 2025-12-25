import { cn } from '@/app/lib/utils';

type StatusType = 'pending' | 'approved' | 'in-production' | 'rejected' | 'draft' | 'editing' | 'review' | 'final' | 'scheduled' | 'uploaded';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-muted text-muted-foreground' },
  approved: { label: 'Approved', className: 'bg-success/10 text-success' },
  'in-production': { label: 'In Production', className: 'bg-info/10 text-info' },
  rejected: { label: 'Rejected', className: 'bg-destructive/10 text-destructive' },
  draft: { label: 'Draft', className: 'bg-muted text-muted-foreground' },
  editing: { label: 'Editing', className: 'bg-warning/10 text-warning' },
  review: { label: 'Review', className: 'bg-info/10 text-info' },
  final: { label: 'Final', className: 'bg-success/10 text-success' },
  scheduled: { label: 'Scheduled', className: 'bg-primary/10 text-primary' },
  uploaded: { label: 'Uploaded', className: 'bg-success/10 text-success' },
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};
