"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  deleteReviewByAdmin,
  dismissReport,
  approveReview,
} from "@/actions/moderation";
import { Button } from "@/components/ui/button";

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
      router.refresh();
    } catch (error) {
      console.error("Failed to delete review", error);
    } finally {
      setIsSubmitted(false);
    }
  }

  async function handleSecondaryAction() {
    setIsSubmitted(true);

    try {
      if (props.type === "report") {
        await dismissReport(props.reportId);
      } else {
        await approveReview(props.reviewId);
      }

      router.refresh();
    } catch (error) {
      console.error("Failed to secondary action", error);
    } finally {
      setIsSubmitted(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDelete}
        disabled={isSubmitted}
      >
        Delete review
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleSecondaryAction}
        disabled={isSubmitted}
      >
        Approve
      </Button>
    </div>
  );
}
