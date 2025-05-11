'use client';

import { HERO_RIGHT_BANNERS, HERO_SLIDER_ITEMS } from '@/lib/constants';
import { Button } from '@repo/ui/components/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@repo/ui/components/carousel';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className='w-full py-6'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2 h-full rounded-md overflow-hidden'>
          <Carousel className='w-full h-full test' opts={{ loop: true }}>
            <CarouselContent className='h-full'>
              {HERO_SLIDER_ITEMS.map((item) => (
                <CarouselItem key={item.id} className='h-full'>
                  <div className={`w-full h-full ${item.bgColor}`}>
                    <div className='flex flex-col md:flex-row h-full'>
                      <div className='p-8 flex flex-col justify-center md:w-1/2'>
                        <h2 className={`text-4xl font-bold mb-2 ${item.textColor}`}>{item.title}</h2>
                        <p className={`text-2xl font-medium mb-4 ${item.textColor}`}>{item.subtitle}</p>
                        <p className={`mb-6 ${item.textColor}`}>{item.description}</p>
                        <Button asChild className='w-fit'>
                          <Link href={item.buttonLink}>{item.buttonText}</Link>
                        </Button>
                      </div>
                      <div className='relative flex items-center justify-center md:w-1/2 p-4'>
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={400}
                          height={400}
                          className='object-contain max-h-[300px]'
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='left-4 bg-black/30 hover:bg-black/50 text-white border-none' />
            <CarouselNext className='right-4 bg-black/30 hover:bg-black/50 text-white border-none' />
          </Carousel>
        </div>

        <div className='lg:col-span-1 flex flex-col gap-4'>
          {HERO_RIGHT_BANNERS.map((banner) => (
            <div key={banner.id} className={`rounded-md overflow-hidden ${banner.bgColor} h-[192px] relative`}>
              <div className='flex h-full p-4'>
                <div className='flex flex-col justify-center w-1/2'>
                  <h3 className={`text-xl font-bold mb-2 ${banner.textColor}`}>{banner.title}</h3>
                  <p className={`text-sm mb-4 ${banner.textColor}`}>{banner.subtitle}</p>
                  <Button asChild size='sm' variant='secondary' className='w-fit'>
                    <Link href={banner.buttonLink}>{banner.buttonText}</Link>
                  </Button>
                </div>
                <div className='relative w-1/2 flex items-center justify-center'>
                  <Image
                    src={banner.image || '/placeholder.svg'}
                    alt={banner.title}
                    width={150}
                    height={150}
                    className='object-contain max-h-[150px]'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
