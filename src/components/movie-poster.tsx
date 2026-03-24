import Image from "next/image";

import { getTmdbImageUrl } from "@/lib/tmdb";
import { cn } from "@/lib/utils";

type MoviePosterProps = {
  path: string | null;
  title: string;
  className?: string;
  size?: "w500" | "w780";
};

export function MoviePoster({
  path,
  title,
  className,
  size = "w500",
}: MoviePosterProps) {
  const imageUrl = getTmdbImageUrl(path, size);

  if (!imageUrl) {
    return (
      <div
        className={cn(
          "relative aspect-[2/3] overflow-hidden rounded-xl shrink-0",
          className,
        )}
      >
        Poster unavailable
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-[2/3] overflow-hidden rounded-xl shrink-0",
        className,
      )}
    >
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  );
}
