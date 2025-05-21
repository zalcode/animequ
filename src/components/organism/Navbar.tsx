import Link from 'next/link';
import { Search, User, BookmarkIcon, Home, List } from 'lucide-react';
import { Button } from '@/components/atom/button';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  return (
    <header className="border-border/40 bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="bg-linear-to-r from-red-500 to-red-700 bg-clip-text text-2xl font-bold text-transparent">
              AnimeQu
            </span>
          </Link>
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between md:space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/anime-list">
                <List className="mr-2 h-4 w-4" />
                Anime List
              </Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/bookmarks">
                <BookmarkIcon className="mr-2 h-4 w-4" />
                Bookmarks
              </Link>
            </Button>
          </nav>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex flex-1 justify-end md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
