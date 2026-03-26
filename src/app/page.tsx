import { getPopularMovies, getTmdbImageUrl } from "@/lib/tmdb";
import { MovieCard } from "@/components/movie-card";
import { HeroCarousel } from "@/components/hero-carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Inter } from "next/font/google";

export default async function HomePage() {
  const movieResponse = await getPopularMovies();
  const movies = movieResponse.results.slice(0, 12);
  const heroMovies = movies
    .filter((movie) => movie.backdrop_path)
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      backdrop: getTmdbImageUrl(movie.backdrop_path, "w780")!,
    }));

  return (
    <main className="mx-auto w-full max-w-7xl px-10 py-10">
      <HeroCarousel movies={heroMovies} />

      <section>
        <h2 className="text-2xl font-bold text-foreground md:text-3xl mt-10">
          Popular
        </h2>
        <div className=" relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <div className="flex justify-end mt-10">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-foreground right-0 px-10"
          >
            <Link href="/movies"> All movies </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
