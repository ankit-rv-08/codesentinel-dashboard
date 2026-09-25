import type { Review } from "@/lib/api";

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function dominantSeverity(review: Review): "error" | "warning" | "info" {
  const b = review.severity_breakdown ?? {};
  if ((b.error ?? 0) > 0) return "error";
  if ((b.warning ?? 0) > 0) return "warning";
  return "info";
}

const severityColor: Record<string, string> = {
  error: "#FF3B30",
  warning: "#FF9500",
  info: "#34C759",
};

export function ReviewsTable({ reviews }: { reviews: Review[] }) {
  return (
    <div className="bg-white border border-[#F0F0F0] rounded-2xl p-7">
      <h3 className="text-[15px] font-semibold tracking-[-0.01em] mb-1">
        Recent Reviews
      </h3>
      <p className="text-[12px] text-[#86868B] mb-5">
        Latest pull requests processed
      </p>

      {reviews.length === 0 ? (
        <p className="text-[13px] text-[#86868B] py-12 text-center">
          No reviews yet. Open a pull request on a repo where CodeSentinel is
          installed.
        </p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="text-[11px] font-medium text-[#86868B] uppercase tracking-[0.06em] pb-3">
                Repo
              </th>
              <th className="text-[11px] font-medium text-[#86868B] uppercase tracking-[0.06em] pb-3">
                PR
              </th>
              <th className="text-[11px] font-medium text-[#86868B] uppercase tracking-[0.06em] pb-3 text-right">
                Comments
              </th>
              <th className="text-[11px] font-medium text-[#86868B] uppercase tracking-[0.06em] pb-3 text-right">
                Severity
              </th>
              <th className="text-[11px] font-medium text-[#86868B] uppercase tracking-[0.06em] pb-3 text-right">
                Latency
              </th>
              <th className="text-[11px] font-medium text-[#86868B] uppercase tracking-[0.06em] pb-3 text-right">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, i) => {
              const sev = dominantSeverity(review);
              return (
                <tr
                  key={i}
                  className="border-t border-[#F5F5F7] hover:bg-[#FAFAFA] transition-colors"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-2.5">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-[#1D1D1F] shrink-0"
                      >
                        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-1.95c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.75 2.7 1.25 3.36.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.56C20.22 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                      </svg>
                      <span className="text-[13px] font-medium text-[#1D1D1F] truncate max-w-[160px]">
                        {review.repo.split("/").pop() ?? review.repo}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-[13px] text-[#86868B] tabular-nums">
                    #{review.pr_number}
                  </td>
                  <td className="py-4 text-[13px] text-[#1D1D1F] tabular-nums text-right">
                    {review.comments_posted}
                  </td>
                  <td className="py-4 text-right">
                    <div className="inline-flex items-center gap-2 justify-end">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: severityColor[sev] }}
                      />
                      <span className="text-[13px] text-[#86868B]">
                        {sev}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-[13px] text-[#1D1D1F] tabular-nums text-right">
                    {review.latency_ms} ms
                  </td>
                  <td className="py-4 text-[13px] text-[#86868B] text-right">
                    {timeAgo(review.created_at)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}