import { MoviePoster } from "@/components/movie-poster";
import { getMovieDetails, getMovieCasts } from "@/lib/tmdb";
import { MovieRating } from "@/components/movie-rating";
import { createClient } from "@/lib/supabase/server";
import { getCommunityRating, getUserRating } from "@/lib/rating";
import { ReviewSection } from "@/components/review";
import { getMovieReviews, getUserReview } from "@/lib/review";
import { MovieInfo } from "@/components/movie-info";

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
    <main className="mx-auto w-full max-w-7xl px-10 py-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
        <MoviePoster
          path={movie.poster_path}
          title={movie.title}
          className="mx-auto w-full md:w-64"
        />
        <section className="flex flex-col gap-5">
          <MovieInfo
            title={movie.title}
            year={movie.release_date}
            tmdbRating={movie.vote_average}
            overview={movie.overview}
            topCredits={topCredits}
          />

          <MovieRating
            movieId={movieId}
            userRating={userRatingRecord?.value ?? null}
            communityRating={communityRating ?? null}
            isSignedIn={!!user}
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
