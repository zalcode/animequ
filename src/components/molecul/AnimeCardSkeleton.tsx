import { Card, CardContent, CardFooter } from '@/components/atom/card';
import { Skeleton } from '@/components/atom/skeleton';

export default function AnimeCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <Skeleton className="aspect-[3/4] w-full" />
      <CardContent className="p-3">
        <Skeleton className="h-5 w-3/4" />
        <div className="mt-2 flex items-center gap-2">
          <Skeleton className="h-3 w-16" />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 p-3 pt-0">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-16" />
      </CardFooter>
    </Card>
  );
}
