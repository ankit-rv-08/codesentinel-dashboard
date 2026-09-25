type StatCardProps = {
  label: string;
  value: string | number;
  unit?: string;
  sublabel: string;
};

export function StatCard({ label, value, unit, sublabel }: StatCardProps) {
  return (
    <div className="bg-white border border-[#F0F0F0] rounded-2xl p-7 flex flex-col gap-2">
      <span className="text-[13px] font-medium text-[#86868B] tracking-[0.01em]">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span className="text-[32px] font-semibold tracking-[-0.02em] tabular-nums">
          {value}
        </span>
        {unit && (
          <span className="text-[16px] font-medium text-[#86868B]">{unit}</span>
        )}
      </div>
      <span className="text-[12px] text-[#86868B]">{sublabel}</span>
    </div>
  );
}