const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

type TmdbGenre = {
  id: number;
  name: string;
};

export type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genre_ids?: number[];
  genres?: TmdbGenre[];
  runtime?: number;
};

type TmdbMovieList = {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
};

type TmdbCreditMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
};

type TmdbCredits = {
  cast: TmdbCreditMember[];
};

function getTmdbApiKey() {
  const tmdbApiKey = process.env.TMDB_API_KEY;

  if (!tmdbApiKey) throw new Error("Missing TMDB API KEY");
  return tmdbApiKey;
}

async function fetchTmdbData<T>(
  path: string | null,
  searchParams?: Record<string, string | number | undefined>,
) {
  const tmdbApiKey = getTmdbApiKey();
  const params = new URLSearchParams({
    api_key: tmdbApiKey,
    language: "en-US",
  });

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params.set(key, String(value));
    }
  });

  const response = await fetch(`${TMDB_BASE_URL}${path}?${params.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok)
    throw new Error(`Failed to get TMDB request:${response.status}`);
  return response.json() as Promise<T>;
}

export function getTmdbImageUrl(
  path: string | null,
  size: "w500" | "w780" | "w1280",
) {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// get now playing movies
export async function getNowPlayingMovies(page = 1) {
  return fetchTmdbData<TmdbMovieList>("/movie/now_playing", { page });
}

// get popular movies
export async function getPopularMovies(page = 1) {
  return fetchTmdbData<TmdbMovieList>("/movie/popular", { page });
}

// search movies
export async function searchMovies(query: string, page = 1) {
  return fetchTmdbData<TmdbMovieList>("/search/movie", { query, page });
}

// get movie details
export async function getMovieDetails(id: string | number) {
  return fetchTmdbData<TmdbMovie>(`/movie/${id}`);
}

// get movie credits
export async function getMovieCasts(id: string | number) {
  return fetchTmdbData<TmdbCredits>(`/movie/${id}/credits`);
}
