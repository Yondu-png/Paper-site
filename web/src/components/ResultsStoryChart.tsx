import { useMemo, useState } from "react";
import table2 from "../../../content/tables/table2.json";

type Row = { label: string; ocd: number; control: number; why: string };

const STORY_ROWS: Row[] = [
  { label: "Any BA screen", ocd: 70, control: 58, why: "Big-picture difference" },
  { label: "Internet", ocd: 29.3, control: 3.1, why: "Largest clear gap" },
  { label: "Pornography", ocd: 12.7, control: 0, why: "Large relative gap" },
  { label: "Sex", ocd: 10, control: 1.5, why: "Meaningful gap" },
];

function gapText(ocd: number, control: number) {
  const delta = ocd - control;
  return `${delta.toFixed(1)} percentage-point gap`;
}

export function ResultsStoryChart() {
  const [active, setActive] = useState<string>(STORY_ROWS[0].label);
  const current = useMemo(() => STORY_ROWS.find((r) => r.label === active) ?? STORY_ROWS[0], [active]);
  const max = Math.max(...STORY_ROWS.flatMap((row) => [row.ocd, row.control]), 100);
  const source = `${table2.label} · ${table2.source}`;

  return (
    <section className="card">
      <div className="section-tag">Results story · key prevalence gaps</div>
      <p style={{ marginTop: 0, fontSize: 14, lineHeight: 1.6 }}>
        Tap a row to focus. This turns dense table values into one simple question: <strong>how much more common was this screen in OCD?</strong>
      </p>
      <div className="story-grid">
        <div>
          {STORY_ROWS.map((row) => (
            <button key={row.label} type="button" className={`story-step ${row.label === active ? "active" : ""}`} onClick={() => setActive(row.label)}>
              <span className="mono">{row.label}</span>
              <span className="mono">{gapText(row.ocd, row.control)}</span>
            </button>
          ))}
        </div>
        <div className="story-bars" role="img" aria-label={`Comparison for ${current.label}`}>
          <div className="story-bar-row">
            <span className="mono">OCD</span>
            <div className="story-track">
              <div className="story-fill" style={{ width: `${(current.ocd / max) * 100}%` }} />
            </div>
            <span className="mono">{current.ocd.toFixed(1)}%</span>
          </div>
          <div className="story-bar-row">
            <span className="mono">Control</span>
            <div className="story-track">
              <div className="story-fill muted" style={{ width: `${(current.control / max) * 100}%` }} />
            </div>
            <span className="mono">{current.control.toFixed(1)}%</span>
          </div>
          <p style={{ margin: "0.75rem 0 0", fontSize: 13, color: "var(--text-muted)" }}>
            {current.why}: <strong style={{ color: "var(--text)" }}>{gapText(current.ocd, current.control)}</strong>.
          </p>
        </div>
      </div>
      <p className="figure-note">{source}</p>
    </section>
  );
}
