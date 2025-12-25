import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Plus, Sparkles } from 'lucide-react';

interface IdeaFormProps {
  onSubmit: (idea: { title: string; description: string; author: string }) => void;
}

export const IdeaForm = ({ onSubmit }: IdeaFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !author.trim()) return;

    setIsSubmitting(true);
    
    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    onSubmit({ title, description, author });
    setTitle('');
    setDescription('');
    setAuthor('');
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 shadow-soft border border-border/50">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Plus className="w-4 h-4 text-primary" />
        </div>
        <h2 className="font-semibold text-foreground">Submit New Idea</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a catchy title for your content idea"
            className="bg-background"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your content idea in detail..."
            rows={3}
            className="bg-background resize-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-1.5">Your Name</label>
          <Input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Who's submitting this idea?"
            className="bg-background"
          />
        </div>

        <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Sparkles className="w-4 h-4 animate-pulse" />
              Getting AI Feedback...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Submit & Get AI Feedback
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
