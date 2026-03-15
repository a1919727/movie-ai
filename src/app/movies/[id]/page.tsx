import { MoviePoster } from "@/components/movie-poster";
import { Badge } from "@/components/ui/badge";
import { getMovieDetails, getMovieCasts } from "@/lib/tmdb";
import { Star } from "lucide-react";

type MovieDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MovieDetailsPage({
  params,
}: MovieDetailsPageProps) {
  const { id } = await params;
  const [movie, credits] = await Promise.all([
    getMovieDetails(id),
    getMovieCasts(id),
  ]);
  const topCredits = credits.cast.slice(0, 6);
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Unknown";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10">
      <div className="flex items-center gap-10">
        <MoviePoster
          path={movie.poster_path}
          title={movie.title}
          className="w-64"
        />
        <section className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold text-foreground">{movie.title}</h1>
          <div className="flex items-center gap-8 text-foreground">
            <span>{year}</span>
            <span className="flex items-center gap-1">
              <Star className="size-4 fill-yellow-300 text-yellow-300 " />
              {rating}
            </span>
          </div>
          <div className="text-foreground">
            <h2 className="text-base font-bold">Overview</h2>
            <p>{movie.overview}</p>
          </div>
          <div>
            <h2 className="text-base font-bold">Cast</h2>
            {topCredits.map((credit) => (
              <Badge variant="outline" key={credit.id}>
                {credit.name}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
