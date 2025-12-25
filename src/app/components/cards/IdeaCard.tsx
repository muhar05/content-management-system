import { ThumbsUp, Sparkles, ArrowRight } from 'lucide-react';
import { ContentIdea } from '@/app/types/cms';
import { StatusBadge } from '@/app/components/ui/status-badge';
import { Button } from '@/app/components/ui/button';
import { cn } from '@/app/lib/utils';

interface IdeaCardProps {
  idea: ContentIdea;
  onVote: () => void;
  onPromote: () => void;
}

export const IdeaCard = ({ idea, onVote, onPromote }: IdeaCardProps) => {
  const canPromote = idea.status === 'pending' || idea.status === 'approved';
  const isInProduction = idea.status === 'in-production';

  return (
    <div className="bg-card rounded-xl p-6 shadow-soft border border-border/50 transition-all duration-200 hover:shadow-medium animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold text-foreground">{idea.title}</h3>
            <StatusBadge status={idea.status} />
          </div>
          <p className="text-sm text-muted-foreground">{idea.description}</p>
        </div>
      </div>

      <div className="bg-accent/50 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-primary mb-1">AI Reviewer</p>
            <p className="text-sm text-muted-foreground">{idea.aiFeedback}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onVote}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
              'bg-muted hover:bg-primary/10 hover:text-primary'
            )}
          >
            <ThumbsUp className="w-4 h-4" />
            {idea.votes}
          </button>
          <span className="text-xs text-muted-foreground">by {idea.author}</span>
        </div>

        {canPromote && (
          <Button
            onClick={onPromote}
            size="sm"
            className="gap-2"
          >
            Promote to Production
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}

        {isInProduction && (
          <span className="text-xs text-info font-medium">Currently in production</span>
        )}
      </div>
    </div>
  );
};
