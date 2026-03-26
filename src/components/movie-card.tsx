import Link from "next/link";
import { Star } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoviePoster } from "./movie-poster";
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
    <Link href={`/movies/${movie.id}`}>
      <Card className="relative mx-auto h-full w-full max-w-sm pt-0 transition-transform duration-300 hover:-translate-y-1">
        <MoviePoster path={movie.poster_path} title={movie.title} />
        <CardHeader className="flex flex-col">
          <CardTitle>{movie.title}</CardTitle>
          <CardDescription className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{year}</span>
            <span className="flex items-center gap-1">
              <Star className="size-4 fill-yellow-300 text-yellow-300" />
              {rating}
            </span>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
