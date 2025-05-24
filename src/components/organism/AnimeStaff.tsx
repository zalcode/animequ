import Image from 'next/image';
import { ScrollArea, ScrollBar } from '@/components/atom/scroll-area';

export interface StaffMember {
  id: number;
  name: string;
  image: string;
  role: string;
}

interface AnimeStaffProps {
  staff: StaffMember[];
}

export default function AnimeStaff({ staff }: AnimeStaffProps) {
  return (
    <div className="bg-card rounded-lg p-6">
      <h2 className="mb-4 text-xl font-bold">Staff</h2>

      <ScrollArea className="w-full pb-4 whitespace-nowrap">
        <div className="flex w-max space-x-4">
          {staff.map(({ role, ...node }) => (
            <div key={node.id + role} className="w-[140px] shrink-0">
              <div className="flex flex-col items-center">
                <div className="relative h-[140px] w-[140px] overflow-hidden rounded-md">
                  <Image
                    src={node.image || '/placeholder.svg?height=140&width=140'}
                    alt={node.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-2 text-center">
                  <h3 className="leading-tight font-medium">{node.name}</h3>
                  <p className="text-muted-foreground text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
