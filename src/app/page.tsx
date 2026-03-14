import { getNowPlayingMovies } from "@/lib/tmdb";
import { MovieCard } from "@/components/movie-card";

export default async function HomePage() {
  const movieResponse = await getNowPlayingMovies();
  const movies = movieResponse.results.slice(0, 10);

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10">
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
