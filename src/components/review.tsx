"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";
import { deleteReview, saveReview } from "@/actions/review";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ReportDialog } from "@/components/report-dialog";
import { toast } from "sonner";
import { DeleteReviewDialog } from "./delete-review-dialog";

type ReviewProps = {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  user: {
    displayName: string | null;
    email: string | null;
    avatarUrl: string | null;
  };
};

type ReviewSectionProps = {
  movieId: number;
  isSignedIn: boolean;
  userReview: ReviewProps | null;
  reviews: ReviewProps[];
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ReviewSection({
  movieId,
  isSignedIn,
  userReview,
  reviews,
}: ReviewSectionProps) {
  const router = useRouter();
  const [content, setContent] = useState(userReview?.content ?? "");
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit() {
    const trimmed = content.trim();
    if (!trimmed) return;

    setIsSubmitted(true);

    try {
      await saveReview(movieId, trimmed);
      router.refresh();
      toast.success("Review has been submitted");
    } catch (error) {
      toast.error("Failed to submit review");
      console.error("Failed to save review", error);
    } finally {
      setIsSubmitted(false);
    }
  }

  async function handleDelete() {
    try {
      await deleteReview(movieId);
      router.refresh();
      toast.success("Review deleted");
    } catch (error) {
      toast.error("Failed to delete review");
      console.error("Failed to delete review");
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {isSignedIn ? (
            <>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share what you thought about this movie..."
              />
              <div className="flex justify-end mt-5">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                  className="hover:scale-105"
                >
                  Submit review
                </Button>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Sign in to write a review.
            </p>
          )}
        </CardContent>
      </Card>

      <>
        {reviews.length ? (
          reviews.map((review) => {
            const userName = review.user.displayName ?? "User";
            const initial = userName.charAt(0).toUpperCase();

            return (
              <div className="space-y-4 mt-10" key={review.id}>
                <div className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarImage
                      src={review.user.avatarUrl ?? ""}
                      alt={userName}
                    />
                    <AvatarFallback>{initial}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{userName}</p>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center ml-12">
                  <p className="text-sm text-foreground flex-1">
                    {review.content}
                  </p>
                  {userReview?.id === review.id ? (
                    <DeleteReviewDialog onConfirm={handleDelete}>
                      <Button
                        type="button"
                        className="text-foreground hover:scale-105 bg-transparent"
                        aria-label="Delete review"
                      >
                        <Trash2 className="size-5" />
                      </Button>
                    </DeleteReviewDialog>
                  ) : null}
                  {isSignedIn && userReview?.id !== review.id ? (
                    <ReportDialog reviewId={review.id} />
                  ) : null}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-muted-foreground mt-5">No reviews</p>
        )}
      </>
    </div>
  );
}
