import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { getAllReports } from "@/lib/report";

export default async function AdminReportsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth?next=/admin/reports");
  if (user.email !== process.env.ADMIN_EMAIL) redirect("/");

  const reports = await getAllReports();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Reported Reviews</h1>
        <p className="text-sm text-muted-foreground">
          Review reports submitted by users.
        </p>
      </div>

      <div className="mt-8 space-y-4">
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
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      Reported review
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {report.review.content}
                    </p>
                  </div>

                  <div className="grid gap-2 text-sm text-muted-foreground">
                    <p>Review author: {reviewAuthor}</p>
                    <p>Reported by: {reporterName}</p>
                    <p>
                      Submitted:{" "}
                      {new Date(report.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
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
      </div>
    </main>
  );
}
