import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeSentinel — Live Telemetry",
  description: "Real-time dashboard for CodeSentinel, the AI code review GitHub App.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}