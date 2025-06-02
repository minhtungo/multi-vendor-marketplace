'use client';

import { HERO_SLIDES } from '@/lib/constants';
import { buttonVariants } from '@repo/ui/components/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@repo/ui/components/carousel';
import { Heading } from '@repo/ui/components/heading';
import { Text } from '@repo/ui/components/text';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className='relative'>
      <Carousel>
        <CarouselContent>
          {HERO_SLIDES.map((slide) => (
            <CarouselItem
              key={`hero-slide-${slide.id}`}
              className='relative h-[500px] md:h-[600px] bg-gradient-to-r from-primary/10 to-secondary/10'
            >
              <div className='grid md:grid-cols-2 gap-8 items-center h-full container'>
                <div>
                  <Heading as='h1' variant='h2' className='mb-2'>
                    {slide.title}
                  </Heading>
                  <Text className='text-xl md:text-2xl text-muted-foreground mb-6'>{slide.subtitle}</Text>
                  <Link href={slide.link} className={cn(buttonVariants({ size: 'lg' }))}>
                    {slide.linkText}
                  </Link>
                </div>
                <Image
                  src={slide.image || '/placeholder.svg'}
                  alt={slide.title}
                  width={600}
                  height={400}
                  className='rounded-lg'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-4' />
        <CarouselNext className='right-4' />
      </Carousel>
    </section>
  );
}
