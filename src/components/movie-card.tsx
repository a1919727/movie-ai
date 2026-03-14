import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MoviePoster } from "@/components/movie-poster";
import { type TmdbMovie } from "@/lib/tmdb";

type MovieCardProps = {
  movie: TmdbMovie;
};

export function MovieCard({ movie }: MovieCardProps) {
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Unknown";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <Link href={`/movies/${movie.id}`} className="group block">
      <Card className="h-full gap-0 py-0 transition-transform duration-300 group-hover:-translate-y-1">
        <MoviePoster path={movie.poster_path} title={movie.title} />
        <CardContent className="space-y-4 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {movie.title}
              </h3>
              <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                <span>{year}</span>
                <span className="flex items-center gap-1">
                  <Star className="size-3.5 fill-current text-foreground" />
                  {rating}
                </span>
              </div>
            </div>
          </div>
          <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
            {movie.overview || "No available overview."}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
