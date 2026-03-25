"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Flag } from "lucide-react";
import { SelectReason } from "@/components/select-reason";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { saveReport } from "@/actions/report";
import { toast } from "sonner";

type ReportProps = {
  reviewId: string;
};
export function ReportDialog({ reviewId }: ReportProps) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!reason) return;
    setIsSubmitted(true);

    try {
      await saveReport(reviewId, reason, description);
      setReason("");
      setDescription("");
      toast.success("Report has been submitted ");
    } catch (error) {
      toast.error("Failed to report");
      console.error("Failed to submit report", error);
    } finally {
      setIsSubmitted(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Flag className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">
              Report review
            </DialogTitle>
            <DialogDescription>
              Tell us why you are reporting this review.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="selector" className="font-bold">
                Select a reason
              </Label>
              <SelectReason value={reason} onValueChange={setReason} />
            </Field>
            <Field>
              <Label htmlFor="input" className="font-bold">
                Optional reason
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your reason here."
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
