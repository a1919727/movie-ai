import { MovieCard } from "@/components/movie-card";
import { getNowPlayingMovies } from "@/lib/tmdb";
import { MoviePagination } from "@/components/movie-pagination";

type MoviesPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params?.page ?? "1") || 1);
  const response = await getNowPlayingMovies(currentPage);
  const totalPages = response?.total_pages ?? 0;
  const movies = response.results;

  return (
    <main className="mx-auto w-full max-w-7xl px-10 py-10">
      <h1 className="text-3xl font-bold text-foreground mb-10">Movie List</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="mt-8">
        <MoviePagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}
