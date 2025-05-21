'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Home, List, BookmarkIcon, Search, User } from 'lucide-react';
import { Button } from '@/components/atom/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/atom/sheet';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">AnimeQu</span>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="flex flex-col space-y-2">
            <Button
              asChild
              variant="ghost"
              className="justify-start"
              onClick={() => setOpen(false)}
            >
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Home
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="justify-start"
              onClick={() => setOpen(false)}
            >
              <Link href="/anime-list">
                <List className="mr-2 h-5 w-5" />
                Anime List
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="justify-start"
              onClick={() => setOpen(false)}
            >
              <Link href="/bookmarks">
                <BookmarkIcon className="mr-2 h-5 w-5" />
                Bookmarks
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="justify-start"
              onClick={() => setOpen(false)}
            >
              <Link href="/search">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="justify-start"
              onClick={() => setOpen(false)}
            >
              <Link href="/profile">
                <User className="mr-2 h-5 w-5" />
                Profile
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
