"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type SeverityChartProps = {
  errorCount: number;
  warningCount: number;
  infoCount: number;
};

export function SeverityChart({
  errorCount,
  warningCount,
  infoCount,
}: SeverityChartProps) {
  const total = errorCount + warningCount + infoCount;
  const data = [
    { name: "error", value: errorCount, color: "#FF3B30" },
    { name: "warning", value: warningCount, color: "#FF9500" },
    { name: "info", value: infoCount, color: "#34C759" },
  ].filter((d) => d.value > 0);

  return (
    <div className="bg-white border border-[#F0F0F0] rounded-2xl p-7 h-full flex flex-col">
      <h3 className="text-[15px] font-semibold tracking-[-0.01em] mb-1">
        Severity Breakdown
      </h3>
      <p className="text-[12px] text-[#86868B] mb-6">Across all reviews</p>

      <div className="flex-1 flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={75}
              outerRadius={95}
              paddingAngle={3}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[36px] font-semibold tracking-[-0.03em] tabular-nums">
            {total}
          </span>
          <span className="text-[12px] text-[#86868B]">Issues</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6">
        <Legend color="#FF3B30" label="error" count={errorCount} />
        <Legend color="#FF9500" label="warning" count={warningCount} />
        <Legend color="#34C759" label="info" count={infoCount} />
      </div>
    </div>
  );
}

function Legend({
  color,
  label,
  count,
}: {
  color: string;
  label: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-[12px] text-[#86868B]">{label}</span>
      <span className="text-[12px] font-medium tabular-nums text-[#1D1D1F]">
        {count}
      </span>
    </div>
  );
}