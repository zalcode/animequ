'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Button } from '../atom/button';
import { Badge } from '../atom/badge';
import Link from 'next/link';
import { Play, Star } from 'lucide-react';
import { CardMediaFragment } from '@/gql/graphql';

export default function AnimeSlider(props: { animes: (CardMediaFragment | null)[] }) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {props.animes.map((anime) => {
        if (anime === null) return null;
        return (
          <SwiperSlide key={anime.id}>
            <SliderContent {...anime} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

function SliderContent(props: CardMediaFragment) {
  return (
    <div
      className={`relative h-[50vh] min-h-[400px] w-full overflow-hidden rounded-xl transition-opacity duration-500`}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={
            props.bannerImage ||
            props.coverImage?.medium ||
            props.coverImage?.large ||
            'https://placehold.co/400'
          }
          alt={'Placeholder'}
          fill
          className="object-cover"
          loading="lazy"
        />
        <div className="from-background via-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
      </div>
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
        <div className="animate-fade-in max-w-3xl">
          <div className="mb-2 flex items-center gap-2">
            {props.genres?.slice(0, 3).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
            {props.averageScore && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{(props.averageScore / 10).toFixed(1)}</span>
              </div>
            )}
          </div>
          <h1 className="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">
            {props.title?.english || props.title?.romaji}
          </h1>
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm md:text-base">
            {props.description?.replace(/<[^>]*>/g, '') || 'No description available.'}
          </p>
          <div className="flex gap-3">
            <Button asChild>
              <Link href={`/anime/${props.id}`}>
                <Play className="mr-2 h-4 w-4" />
                Details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
