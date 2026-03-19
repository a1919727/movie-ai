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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Flag } from "lucide-react";
import { SelectReason } from "@/components/select-reason";
import { Textarea } from "./ui/textarea";

export function ReportDialog() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            {" "}
            <Flag className="size-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-foreground">
              Report review
            </DialogTitle>
            <DialogDescription>
              Tell us why you report this review.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="selector" className="font-bold">
                Select a reason
              </Label>
              <SelectReason />
            </Field>
            <Field>
              <Label htmlFor="input" className="font-bold">
                Optional reason
              </Label>
              <Textarea placeholder="Write your reason here." />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
