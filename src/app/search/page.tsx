import { MovieCard } from "@/components/movie-card";
import { SearchPagination } from "@/components/search-pagination";
import { searchMovies } from "@/lib/tmdb";

type SearchProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const currentPage = Math.max(1, Number(params?.page ?? "1") || 1);
  const response = query ? await searchMovies(query, currentPage) : null;
  const movies = response?.results ?? [];
  const totalPages = response?.total_pages ?? 0;

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10">
      <div className="space-y-2">
        {query ? (
          <p className="text-lg font-bold text-foreground">
            Results for "{query}"
          </p>
        ) : (
          <p className="text-lg font-bold text-foreground">Not found</p>
        )}
      </div>

      {movies.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : query ? (
        <p className="mt-8 text-sm text-foreground">No found.</p>
      ) : null}

      <div className="mt-8">
        <SearchPagination
          currentPage={currentPage}
          totalPages={totalPages}
          query={query}
        />
      </div>
    </main>
  );
}
