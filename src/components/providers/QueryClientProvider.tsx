// In Next.js, this file would be called: app/providers.tsx
'use client';

import { getQueryClient } from './getQueryClient';
import { QueryClientProvider as BaseProvider } from '@tanstack/react-query';
import * as React from 'react';

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient();

  return <BaseProvider client={queryClient}>{children}</BaseProvider>;
}
