'use client';

import { DailyQuestDashboard } from '@/components/quests/DailyQuestDashboard';
import { useUser } from '@/context/UserContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function TasksPage() {
  const { user, loading } = useUser();

  if (loading || !user) {
    return (
        <div className="space-y-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
        </div>
    );
  }

  return <DailyQuestDashboard userId={user.uid} />;
}
