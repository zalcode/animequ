import ImageSlider from '@/components/organism/ImageSlider';
import animes from './animes.json';

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container space-y-8 py-6">
        <ImageSlider animes={animes} />
      </div>
    </div>
  );
}
