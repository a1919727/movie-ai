"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import Autoplay from "embla-carousel-autoplay";

type Movie = {
  id: number;
  title: string;
  backdrop: string;
};

export function HeroCarousel({ movies }: { movies: Movie[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full rounded-2xl overflow-hidden"
    >
      <CarouselContent className="ml-0">
        {movies.map((movie) => (
          <CarouselItem key={movie.id} className="pl-0">
            <div className="relative h-[600px] w-full">
              <Image
                src={movie.backdrop}
                alt={movie.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-10 left-10 text-white">
                <h2 className="text-4xl font-bold mb-5">{movie.title}</h2>
                <div className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8">
                  <Button
                    asChild
                    size="lg"
                    className="border-white/40 bg-white/20 text-white hover:bg-white/20"
                  >
                    <Link href={`/movies/${movie.id}`}> Open details </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                  >
                    <Link href="/movies"> All movies </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute right-6 bottom-6 flex items-center gap-4">
        <CarouselPrevious className="static translate-y-0" />
        <CarouselNext className="static translate-y-0" />
      </div>
    </Carousel>
  );
}
