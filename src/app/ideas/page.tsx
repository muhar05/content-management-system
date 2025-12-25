'use client';

import { useCMS } from '@/app/context/CMSContext';
import { IdeaCard } from '@/app/components/cards/IdeaCard';
import { IdeaForm } from '@/app/components/forms/IdeaForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const ContentIdeas = () => {
  const { ideas, addIdea, voteIdea, promoteToProduction } = useCMS();

  const pendingIdeas = ideas.filter((i) => i.status === 'pending');
  const approvedIdeas = ideas.filter((i) => i.status === 'approved');
  const inProductionIdeas = ideas.filter((i) => i.status === 'in-production');

  const handleSubmit = (idea: { title: string; description: string; author: string }) => {
    addIdea(idea);
    toast.success('Idea submitted!', {
      description: 'AI Reviewer has analyzed your content idea.',
    });
  };

  const handleVote = (id: string) => {
    voteIdea(id);
    toast.success('Vote recorded!');
  };

  const handlePromote = (id: string) => {
    promoteToProduction(id);
    toast.success('Idea promoted to production!', {
      description: 'A new video project has been created.',
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Content Ideas</h1>
        <p className="text-muted-foreground mt-1">Submit, vote, and battle for the best ideas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <IdeaForm onSubmit={handleSubmit} />

          <div className="mt-6 bg-accent/50 rounded-xl p-4 border border-primary/10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-sm font-medium text-foreground">How it works</p>
            </div>
            <ol className="text-sm text-muted-foreground space-y-2">
              <li className="flex gap-2">
                <span className="font-medium text-primary">1.</span>
                Submit your content idea
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-primary">2.</span>
                AI provides instant feedback
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-primary">3.</span>
                Team votes on ideas
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-primary">4.</span>
                Top ideas get promoted
              </li>
            </ol>
          </div>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="pending">
                Pending ({pendingIdeas.length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({approvedIdeas.length})
              </TabsTrigger>
              <TabsTrigger value="production">
                In Production ({inProductionIdeas.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingIdeas.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No pending ideas. Submit one to get started!
                </div>
              ) : (
                pendingIdeas.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    onVote={() => handleVote(idea.id)}
                    onPromote={() => handlePromote(idea.id)}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              {approvedIdeas.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No approved ideas yet.
                </div>
              ) : (
                approvedIdeas.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    onVote={() => handleVote(idea.id)}
                    onPromote={() => handlePromote(idea.id)}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="production" className="space-y-4">
              {inProductionIdeas.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No ideas in production yet.
                </div>
              ) : (
                inProductionIdeas.map((idea) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    onVote={() => handleVote(idea.id)}
                    onPromote={() => handlePromote(idea.id)}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ContentIdeas;
