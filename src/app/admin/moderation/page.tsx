import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { getAllReports } from "@/lib/report";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFlaggedReviews } from "@/lib/review";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ModerationPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth?next=/admin/moderation");
  if (user.email !== process.env.ADMIN_EMAIL) redirect("/");

  const reports = await getAllReports();
  const flaggedReviews = await getFlaggedReviews();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Moderation</h1>
        <p className="text-sm text-muted-foreground">
          Review reports submitted by users or detected by Gemini.
        </p>
      </div>

      <Tabs defaultValue="reports">
        <TabsList className="mt-5 mb-5">
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="ai-detection">AI detection</TabsTrigger>
        </TabsList>
        <TabsContent value="reports">
          {reports.length ? (
            reports.map((report) => {
              const reporterName =
                report.reporter.displayName ?? report.reporter.email;
              const reviewAuthor =
                report.review.user.displayName ?? report.review.user.email;

              return (
                <Card key={report.id}>
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">
                      {report.reason}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid gap-2 text-sm text-muted-foreground">
                      <p className="text-sm text-muted-foreground">
                        Review content: {report.review.content}
                      </p>
                      <p>Review author: {reviewAuthor}</p>
                      <p>Reported by: {reporterName}</p>
                      <p>Date: {formatDate(report.createdAt)}</p>
                      {report.description ? (
                        <p>Additional details: {report.description}</p>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">No reports.</p>
          )}
        </TabsContent>
        <TabsContent value="ai-detection">
          {flaggedReviews.length ? (
            flaggedReviews.map((review) => {
              const authorName = review.user.displayName ?? review.user.email;

              return (
                <Card key={review.id}>
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">
                      {review.aiLabel}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid gap-2 text-sm text-muted-foreground">
                      <p className="text-sm text-muted-foreground">
                        Review content: {review.content}
                      </p>
                      <p>Review author: {authorName}</p>
                      <p>Reported by: Gemini</p>
                      <p>Date:{formatDate(review.aiCheckedAt)}</p>
                      {review.aiReason ? (
                        <p>Additional details: {review.aiReason}</p>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">No reports.</p>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
