import { useMemo, useState } from "react";
import figure from "../../../content/figures/figure1.json";

type Point = { label: string; mean: number; sd: number; note: string };

const DATA: Point[] = figure.series.map((row) => ({
  label: row.group,
  mean: row.mean,
  sd: row.sd,
  note: row.nReported,
}));

const W = 420;
const H = 220;
const PAD = 44;
const BAR = 56;
const GAP = 28;

export function FigureBisChart() {
  const [active, setActive] = useState<string>(DATA[2]?.label ?? DATA[0]?.label);
  const maxY = 90;
  const plotH = H - PAD - 16;
  const baseY = H - 16;
  const x0 = PAD;
  const activeData = useMemo(() => DATA.find((d) => d.label === active) ?? DATA[0], [active]);

  return (
    <div className="figure-wrap">
      <div className="section-tag" style={{ marginBottom: 8 }}>
        {figure.label} · interactive reconstruction
      </div>
      <div className="toolbar no-print" style={{ marginBottom: 8 }}>
        {DATA.map((d) => (
          <button key={d.label} type="button" className={`btn ${active === d.label ? "btn-primary" : ""}`} onClick={() => setActive(d.label)}>
            {d.label}
          </button>
        ))}
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Bar chart of BIS-11 means">
        <title>BIS-11 total: HC, OCD, OCD with behavioural addiction</title>
        <line x1={PAD - 8} y1={16} x2={PAD - 8} y2={baseY} stroke="var(--border-strong)" strokeWidth={1} />
        {[0, 30, 60, 90].map((t) => {
          const y = baseY - (t / maxY) * plotH;
          return (
            <g key={t}>
              <line x1={PAD - 8} y1={y} x2={W - 12} y2={y} stroke="var(--border)" strokeWidth={1} />
              <text x={PAD - 12} y={y + 4} textAnchor="end" className="mono" style={{ fontSize: 9, fill: "var(--text-muted)" }}>
                {t}
              </text>
            </g>
          );
        })}
        {DATA.map((d, i) => {
          const x = x0 + i * (BAR + GAP);
          const h = (d.mean / maxY) * plotH;
          const y = baseY - h;
          const err = (d.sd / maxY) * plotH;
          const focused = d.label === active;
          return (
            <g key={d.label}>
              <rect x={x} y={y} width={BAR} height={h} fill="var(--te-orange)" opacity={focused ? 0.96 : 0.38} />
              <line x1={x + BAR / 2} y1={y - err} x2={x + BAR / 2} y2={y + err} stroke="var(--text)" strokeWidth={1.5} />
              <line x1={x + BAR / 2 - 10} y1={y - err} x2={x + BAR / 2 + 10} y2={y - err} stroke="var(--text)" strokeWidth={1} />
              <line x1={x + BAR / 2 - 10} y1={y + err} x2={x + BAR / 2 + 10} y2={y + err} stroke="var(--text)" strokeWidth={1} />
              <text x={x + BAR / 2} y={baseY + 14} textAnchor="middle" className="mono" style={{ fontSize: 10, fill: "var(--text)" }}>
                {d.label}
              </text>
              <text x={x + BAR / 2} y={y - err - 6} textAnchor="middle" className="mono" style={{ fontSize: 9, fill: "var(--text)" }}>
                {d.mean.toFixed(2)}
              </text>
            </g>
          );
        })}
        <text x={12} y={14} className="mono" style={{ fontSize: 9, fill: "var(--text-muted)" }}>
          BIS-11 total (mean ± SD bars)
        </text>
      </svg>
      <div className="callout-soft" style={{ marginTop: "0.65rem" }}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55 }}>
          <strong>{activeData.label}</strong>: mean {activeData.mean.toFixed(2)}; spread (SD, standard deviation) {activeData.sd.toFixed(2)}.
        </p>
        <p style={{ margin: "0.35rem 0 0", fontSize: 12, color: "var(--text-muted)" }}>{activeData.note}</p>
      </div>
      <p className="figure-note" style={{ lineHeight: 1.6 }}>
        Read this like a 3-step ladder: HC (healthy controls) is lowest, OCD is middle, and OCD+BA is highest. The paper tested this with
        ANOVA (three-group average comparison), p &lt; 0.001 (very unlikely by chance alone). Vertical whiskers show +/-1 SD (how spread out
        scores were in each group).
      </p>
    </div>
  );
}
