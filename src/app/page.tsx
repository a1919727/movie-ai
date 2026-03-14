import { getNowPlayingMovies } from "@/lib/tmdb";

export default async function Home() {
  const data = await getNowPlayingMovies();

  return (
    <div>
      {data.results.slice(0, 10).map((movie) => (
        <p key={movie.id}>{movie.id}</p>
      ))}
    </div>
  );
}
