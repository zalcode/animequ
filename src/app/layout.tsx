import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/organism/Navbar';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import QueryClientProvider from '@/components/providers/QueryClientProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AnimeQu - Your Anime Companion',
  description: 'Discover and track your favorite anime with AnimeQu',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <QueryClientProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
