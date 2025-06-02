'use client';

import { HERO_SLIDER_ITEMS } from '@/lib/constants';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@repo/ui/components/carousel';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <Carousel className='w-full h-[calc(100vh-100px)]'>
      <CarouselContent>
        {HERO_SLIDER_ITEMS.map((item) => (
          <CarouselItem key={item.id}>
            <Image
              src={item.image}
              alt={item.title}
              width={800}
              height={400}
              className='w-full h-full object-cover object-center aspect-auto'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='left-4' />
      <CarouselNext className='right-4' />
    </Carousel>
  );
}
