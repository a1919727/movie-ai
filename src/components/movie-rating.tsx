"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { saveRating } from "@/actions/rating";

type MovieRating = {
  movieId: number;
  userRating: number | null;
  communityRating: number | null;
};

export function MovieRating({
  movieId,
  userRating,
  communityRating,
}: MovieRating) {
  const router = useRouter();
  const [currentRating, setCurrentRating] = useState(userRating ?? 0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleRate(value: number) {
    if (isSubmitted) return;

    setCurrentRating(value);
    setIsSubmitted(true);

    try {
      await saveRating(movieId, value);
      router.refresh();
    } catch (error) {
      setCurrentRating(userRating ?? 0);
      console.error("Failed to save rating", error);
    } finally {
      setIsSubmitted(false);
    }
  }

  return (
    <section className="grid gap-6 md:grid-cols-3">
      <div className="space-y-1">
        <h2 className="text-base font-bold text-foreground">
          Community rating
        </h2>
        <p className="text-sm text-muted-foreground">
          {communityRating ? `${communityRating.toFixed(1)} / 5` : "No ratings"}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-base font-bold text-foreground">Your rating</h2>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => {
            return (
              <button
                key={value}
                type="button"
                disabled={isSubmitted}
                onClick={() => handleRate(value)}
                className="transition hover:scale-110"
                aria-label={`Rate ${value} stars`}
              >
                <Star
                  className={
                    value <= currentRating
                      ? "size-6 fill-yellow-300 text-yellow-300"
                      : "size-6 text-muted-foreground"
                  }
                />
              </button>
            );
          })}
        </div>

        <p className="text-sm text-muted-foreground">
          Please rate this movie from 1 to 5 stars.
        </p>
      </div>
    </section>
  );
}
