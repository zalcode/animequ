'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/atom/badge';
import { TagFragment } from '@/gql/graphql';

interface AnimeTagsProps {
  tags: TagFragment[];
}

export default function AnimeTags({ tags }: AnimeTagsProps) {
  const [showAll, setShowAll] = useState(false);

  // Sort tags by rank
  const sortedTags = [...tags].sort((a, b) => (b.rank || 0) - (a.rank || 0));

  // Display only top 8 tags if not showing all
  const displayTags = showAll ? sortedTags : sortedTags.slice(0, 8);

  return (
    <div className="bg-card rounded-lg p-6">
      <h2 className="mb-4 text-xl font-bold">Tags</h2>
      <div className="flex flex-wrap gap-2">
        {displayTags.map((tag) => (
          <Badge key={tag.id} variant="outline" className="bg-secondary/10 text-sm">
            {tag.name}
          </Badge>
        ))}
      </div>

      {tags.length > 8 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-primary mt-4 flex items-center gap-1 text-sm"
        >
          {showAll ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Show all {tags.length} tags
            </>
          )}
        </button>
      )}
    </div>
  );
}
