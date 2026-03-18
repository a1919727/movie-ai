import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trash2 } from "lucide-react";

export function Review() {
  return (
    <div>
      <h2 className="text-base font-bold text-foreground mb-10">Review</h2>
      <Card>
        <CardHeader>
          <CardTitle>Write a review</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea placeholder="Share your ideas about this movie..." />
          <Button className=" mt-10">Submit review</Button>
        </CardContent>
      </Card>

      <div className="space-y-4 mt-10">
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarFallback>J</AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">Judy</p>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-foreground flex-1">
                Great pacing and strong performances.
              </p>
              <Button className="bg-transparent text-foreground">
                <Trash2 />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
