const API_BASE = "https://codesentinel-u6se.onrender.com";

export type Review = {
  repo: string;
  pr_number: number;
  comments_posted: number;
  severity_breakdown: {
    error?: number;
    warning?: number;
    info?: number;
  };
  latency_ms: number;
  created_at: string;
};

export type Stats = {
  total_reviews: number;
  total_comments: number;
  total_files_reviewed: number;
  avg_latency_ms: number;
  recent_reviews: Review[];
};

export async function fetchStats(): Promise<Stats> {
  const res = await fetch(`${API_BASE}/api/stats`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Stats fetch failed: ${res.status}`);
  return res.json();
}