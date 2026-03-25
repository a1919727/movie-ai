"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteReviewByAdmin, approveReview } from "@/actions/moderation";
import { Button } from "@/components/ui/button";
import { DeleteReviewDialog } from "./delete-review-dialog";
import { toast } from "sonner";

type ModerationActionsProps =
  | {
      type: "report";
      reportId: string;
      reviewId: string;
    }
  | {
      type: "ai";
      reviewId: string;
    };

export function ModerationActions(props: ModerationActionsProps) {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleDelete() {
    setIsSubmitted(true);

    try {
      await deleteReviewByAdmin(props.reviewId);
      toast.success("Reported review has been deleted");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete reported review");
      console.error("Failed to delete reported review", error);
    } finally {
      setIsSubmitted(false);
    }
  }

  async function handleSecondaryAction() {
    setIsSubmitted(true);

    try {
      await approveReview(props.reviewId);
      toast.success("Reported review has been approved");
      router.refresh();
    } catch (error) {
      toast.error("Failed to approve reported reveiw");
      console.error("Failed to approve reported review", error);
    } finally {
      setIsSubmitted(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <DeleteReviewDialog onConfirm={handleDelete}>
        <Button variant="outline" size="sm" disabled={isSubmitted}>
          Delete review
        </Button>
      </DeleteReviewDialog>

      <Button
        variant="outline"
        size="sm"
        onClick={handleSecondaryAction}
        disabled={isSubmitted}
      >
        Approve review
      </Button>
    </div>
  );
}
