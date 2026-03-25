import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type MovieInforProps = {
  title: string;
  year: string;
  tmdbRating: number;
  overview: string;
  topCredits: Array<{ id: number; name: string }>;
};

export function MovieInfo({
  title,
  year,
  tmdbRating,
  overview,
  topCredits,
}: MovieInforProps) {
  const movieYear = year ? new Date(year).getFullYear() : "Unknown";
  const tmdbMovieRating = tmdbRating ? tmdbRating.toFixed(1) : "N/A";
  return (
    <section className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <div className="flex items-center gap-8 text-foreground">
        <span>{movieYear}</span>
        <span className="flex items-center gap-1">
          <Star className="size-4 fill-yellow-300 text-yellow-300 " />
          {tmdbMovieRating}
        </span>
      </div>
      <div className="text-foreground text-sm">
        <h2 className="text-base font-bold text-foreground">Overview</h2>
        <p className="text-muted-foreground">{overview}</p>
      </div>
      <div>
        <h2 className="text-base font-bold text-foreground">Cast</h2>
        {topCredits.map((credit) => (
          <Badge variant="outline" key={credit.id}>
            {credit.name}
          </Badge>
        ))}
      </div>
    </section>
  );
}
