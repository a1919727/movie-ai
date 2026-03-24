import { redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/server";
import { getReports } from "@/lib/report";
import { getFlaggedReviews } from "@/lib/review";
import { ModerationActions } from "@/components/moderation-actions";
import { ModerationPagination } from "@/components/moderation-pagination";

type ModerationPageProps = {
  searchParams?: Promise<{
    tab?: string;
    reportsPage?: string;
    aiPage?: string;
  }>;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ModerationPage({
  searchParams,
}: ModerationPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth?next=/admin/moderation");
  if (user.email !== process.env.ADMIN_EMAIL) redirect("/");

  const params = await searchParams;
  const activeTab = params?.tab === "ai-detection" ? "ai-detection" : "reports";
  const reportsPage = Math.max(1, Number(params?.reportsPage ?? "1") || 1);
  const aiPage = Math.max(1, Number(params?.aiPage ?? "1") || 1);

  const PAGE_SIZE = 5;
  const reportsResult = await getReports({
    page: reportsPage,
    limit: PAGE_SIZE,
  });

  const detectionResult = await getFlaggedReviews({
    page: aiPage,
    limit: PAGE_SIZE,
  });

  return (
    <main className="mx-auto w-full max-w-5xl px-10 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Moderation</h1>
        <p className="text-sm text-muted-foreground">
          Review reports submitted by users or detected by Gemini.
        </p>
      </div>

      <Tabs defaultValue={activeTab}>
        <TabsList className="mt-5 mb-5 gap-5">
          <TabsTrigger value="reports" asChild>
            <Link href="/admin/moderation?tab=reports&reportsPage=1">
              Reports
            </Link>
          </TabsTrigger>
          <TabsTrigger value="ai-detection" asChild>
            <Link href="/admin/moderation?tab=ai-detection&aiPage=1">
              AI detection
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reports" className="flex flex-col gap-8">
          {reportsResult.reports.length ? (
            reportsResult.reports.map((report) => {
              const reporterName =
                report.reporter.displayName ?? report.reporter.email;
              const reviewAuthor =
                report.review.user.displayName ?? report.review.user.email;

              return (
                <Card key={report.id}>
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">
                      {report.reason.charAt(0).toUpperCase() +
                        report.reason.slice(1)}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid gap-2 text-sm text-muted-foreground">
                      <p>Review author: {reviewAuthor}</p>
                      <p className="text-sm text-muted-foreground">
                        Review content: {report.review.content}
                      </p>
                      <p>Reported by: {reporterName}</p>
                      <p>Date: {formatDate(report.createdAt)}</p>
                      {report.description ? (
                        <p>Report details: {report.description}</p>
                      ) : null}
                    </div>
                    <div className="flex justify-end">
                      <ModerationActions
                        type="report"
                        reportId={report.id}
                        reviewId={report.review.id}
                      />
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">No reports.</p>
          )}

          {reportsResult.totalPages > 1 ? (
            <ModerationPagination
              currentPage={reportsPage}
              totalPages={reportsResult.totalPages}
              tabHref={(page) =>
                `/admin/moderation?tab=reports&reportsPage=${page}&aiPage=${aiPage}`
              }
            />
          ) : null}
        </TabsContent>

        <TabsContent value="ai-detection" className="flex flex-col gap-8">
          {detectionResult.reviews.length ? (
            detectionResult.reviews.map((review) => {
              const authorName = review.user.displayName ?? review.user.email;

              return (
                <Card key={review.id}>
                  <CardHeader>
                    <CardTitle className="text-base font-semibold">
                      {review.aiLabel
                        ? review.aiLabel.charAt(0).toUpperCase() +
                          review.aiLabel.slice(1)
                        : ""}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid gap-2 text-sm text-muted-foreground">
                      <p className="text-sm text-muted-foreground">
                        Review content: {review.content}
                      </p>
                      <p>Review author: {authorName}</p>
                      <p>Reported by: Gemini</p>
                      <p>
                        Date:
                        {review.aiCheckedAt
                          ? formatDate(review.aiCheckedAt)
                          : ""}
                      </p>
                      {review.aiReason ? (
                        <p>Gemini reason: {review.aiReason}</p>
                      ) : null}
                    </div>
                    <div className="flex justify-end">
                      <ModerationActions type="ai" reviewId={review.id} />
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">No reports.</p>
          )}
          {detectionResult.totalPages > 1 ? (
            <ModerationPagination
              currentPage={aiPage}
              totalPages={detectionResult.totalPages}
              tabHref={(page) =>
                `/admin/moderation?tab=ai-detection&reportsPage=${reportsPage}&aiPage=${page}`
              }
            />
          ) : null}
        </TabsContent>
      </Tabs>
    </main>
  );
}
