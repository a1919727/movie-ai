import { MoviePoster } from "@/components/movie-poster";
import { Badge } from "@/components/ui/badge";
import { getMovieDetails, getMovieCasts } from "@/lib/tmdb";
import { Star } from "lucide-react";
import { MovieRating } from "@/components/movie-rating";
import { createClient } from "@/lib/supabase/server";
import { getCommunityRating, getUserRating } from "@/lib/rating";
import { ReviewSection } from "@/components/review";
import { getMovieReviews, getUserReview } from "@/lib/review";

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

  // Rating
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const movieId = movie.id;

  const communityRating = await getCommunityRating(movieId);
  let userRatingRecord = null;
  if (user) userRatingRecord = await getUserRating(user.id, movieId);

  // Review
  const reviews = await getMovieReviews(movie.id);
  let userReview = null;
  if (user) userReview = await getUserReview(user.id, movie.id);

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
            <h2 className="text-base font-bold text-foreground">Overview</h2>
            <p>{movie.overview}</p>
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground">Cast</h2>
            {topCredits.map((credit) => (
              <Badge variant="outline" key={credit.id}>
                {credit.name}
              </Badge>
            ))}
          </div>

          <MovieRating
            movieId={movieId}
            userRating={userRatingRecord?.value ?? null}
            communityRating={communityRating ?? null}
          />

          <ReviewSection
            movieId={movieId}
            isSignedIn={!!user}
            userReview={userReview}
            reviews={reviews}
          />
        </section>
      </div>
    </main>
  );
}
