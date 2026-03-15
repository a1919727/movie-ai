import { getNowPlayingMovies, getTmdbImageUrl } from "@/lib/tmdb";
import { MovieCard } from "@/components/movie-card";
import { HeroCarousel } from "@/components/hero-carousel";

export default async function HomePage() {
  const movieResponse = await getNowPlayingMovies();
  const movies = movieResponse.results.slice(0, 12);
  const heroMovies = movies
    .filter((movie) => movie.backdrop_path)
    .map((movie) => ({
      id: movie.id,
      title: movie.title,
      backdrop: getTmdbImageUrl(movie.backdrop_path, "w780")!,
    }));

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10">
      <HeroCarousel movies={heroMovies} />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
