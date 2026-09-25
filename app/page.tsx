import { Navbar } from "@/components/Navbar";
import { StatCard } from "@/components/StatCard";
import { SeverityChart } from "@/components/SeverityChart";
import { ReviewsTable } from "@/components/ReviewsTable";
import { fetchStats } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  let stats = {
    total_reviews: 0,
    total_comments: 0,
    total_files_reviewed: 0,
    avg_latency_ms: 0,
    recent_reviews: [] as any[],
  };

  try {
    stats = await fetchStats();
  } catch {
    // keep defaults — dashboard renders with zeros
  }

  const errorCount = stats.recent_reviews.reduce(
    (sum, r) => sum + (r.severity_breakdown?.error ?? 0),
    0
  );
  const warningCount = stats.recent_reviews.reduce(
    (sum, r) => sum + (r.severity_breakdown?.warning ?? 0),
    0
  );
  const infoCount = stats.recent_reviews.reduce(
    (sum, r) => sum + (r.severity_breakdown?.info ?? 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#FBFBFD]">
      <Navbar />

      <main className="max-w-[1240px] mx-auto px-8 py-10">
        <header className="mb-10">
          <h1 className="text-[28px] font-semibold tracking-[-0.02em]">
            Overview
          </h1>
          <p className="text-[14px] text-[#86868B] mt-1">
            Real-time metrics from all installed repositories.
          </p>
        </header>

        <section className="grid grid-cols-4 gap-5 mb-10">
          <StatCard
            label="Total Reviews"
            value={stats.total_reviews.toLocaleString()}
            sublabel="across all repositories"
          />
          <StatCard
            label="Comments Posted"
            value={stats.total_comments.toLocaleString()}
            sublabel="inline comments generated"
          />
          <StatCard
            label="Avg Latency"
            value={stats.avg_latency_ms.toFixed(1)}
            unit="ms"
            sublabel="per PR review"
          />
          <StatCard
            label="Files Reviewed"
            value={stats.total_files_reviewed.toLocaleString()}
            sublabel="unique files"
          />
        </section>

        <section className="grid grid-cols-[1.5fr_1fr] gap-5">
          <ReviewsTable reviews={stats.recent_reviews} />
          <SeverityChart
            errorCount={errorCount}
            warningCount={warningCount}
            infoCount={infoCount}
          />
        </section>

        <footer className="mt-16 pb-8 flex items-center justify-between text-[12px] text-[#86868B]">
          <span>CodeSentinel · AI Code Review GitHub App</span>
          <a
            href="https://github.com/ankit-rv-08/codesentinel"
            className="hover:text-[#1D1D1F] transition-colors"
          >
            github.com/ankit-rv-08/codesentinel
          </a>
        </footer>
      </main>
    </div>
  );
}
