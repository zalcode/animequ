'use client';

import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
  text?: string | null;
  className?: string | null;
};

export default function ExpandButton({ text, className }: Props) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text && text.length > 300;
  const displayText = !expanded && isLong ? text.substring(0, 300) + '...' : text;

  return (
    <>
      <p className={cn('text-card-foreground/90 text-sm leading-relaxed', className)}>
        {displayText}
      </p>
      {isLong ? (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-primary mt-2 flex items-center gap-1 text-sm"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Show more
            </>
          )}
        </button>
      ) : null}
    </>
  );
}
