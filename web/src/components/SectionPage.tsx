import type { CourseSection, GenericTable } from "../types/content";
import { DataTable } from "./DataTable";
import { FigureBisChart } from "./FigureBisChart";
import { StatsLab } from "./StatsLab";
import { ResultsStoryChart } from "./ResultsStoryChart";
import comparisons from "../../../content/comparisons.json";

type Props = {
  section: CourseSection;
  index: number;
  total: number;
  tables?: GenericTable[];
};

export function SectionPage({ section, index, total, tables }: Props) {
  const label = String(index + 1).padStart(2, "0");
  const helperTerms: Array<{ term: string; simple: string }> = [
    { term: "p <", simple: "small p-value means lower chance the gap is random" },
    { term: "ANOVA", simple: "test for comparing averages across 3 groups" },
    { term: "chi-square", simple: "test for comparing counts/percentages" },
    { term: "Mann", simple: "rank-based test when scores are skewed" },
    { term: "Y-BOCS", simple: "clinician score for OCD symptom severity" },
    { term: "BIS-11", simple: "self-report impulsivity score" },
  ];
  const activeHelpers = helperTerms.filter((h) =>
    [section.plainSummary, ...section.keyClaims, section.presenter1min, section.presenter5min].some((txt) => txt.includes(h.term))
  );

  if (section.id === "appendix-stats-lab") {
    return (
      <article>
        <div className="section-tag">
          SEQ {label}/{String(total).padStart(2, "0")} · stats lab
        </div>
        <h1>{section.title}</h1>
        <div className="card">
          <div className="label mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            Walkthrough · plain language
          </div>
          <p style={{ margin: "0.35rem 0 0", fontSize: 15, lineHeight: 1.65 }}>{section.plainSummary}</p>
        </div>
        <StatsLab />
        {section.quiz.length > 0 ? (
          <>
            <h2>Check your understanding</h2>
            <div className="card quiz">
              {section.quiz.map((item, i) => (
                <div key={i} className="quiz-item">
                  <div className="quiz-q">{item.q}</div>
                  <details>
                    <summary>Reveal answer</summary>
                    <div className="answer">{item.a}</div>
                  </details>
                </div>
              ))}
            </div>
          </>
        ) : null}
        <h2>Presenter / teacher cues</h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 0 }}>
          Optional soundbites if you are teaching this module aloud.
        </p>
        <div className="presenter">
          <div className="card">
            <div className="label">01 min</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55 }}>{section.presenter1min}</p>
          </div>
          <div className="card">
            <div className="label">05 min</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55 }}>{section.presenter5min}</p>
          </div>
        </div>
      </article>
    );
  }

  if (section.id === "appendix-cheat-sheet") {
    return (
      <article>
        <div className="section-tag">
          SEQ {label}/{String(total).padStart(2, "0")} · cheat sheet
        </div>
        <h1>{section.title}</h1>
        <div className="card">
          <div className="label mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            Walkthrough · plain language
          </div>
          <p style={{ marginTop: "0.35rem", lineHeight: 1.65 }}>{section.plainSummary}</p>
          <ul className="plain">
            {section.keyClaims.map((c) => (
              <li key={c}>
                <span className="mono">{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <h2>Measure comparison (quick)</h2>
        <div className="table-scroll-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>BIS-11</th>
                <th>IAT</th>
                <th>TMD</th>
                <th>EAT-26</th>
                <th>CBS</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.rows.map((r) => (
                <tr key={r.aspect}>
                  <td className="mono">{r.aspect}</td>
                  <td>{r.bis11}</td>
                  <td>{r.iat}</td>
                  <td>{r.tmd}</td>
                  <td>{r.eat26}</td>
                  <td>{r.cbs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2>Presenter / teacher cues</h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 0 }}>
          Short and longer soundbites if you are explaining this paper aloud—optional; reading alone can skip this block.
        </p>
        <div className="presenter">
          <div className="card">
            <div className="label">01 min</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55 }}>{section.presenter1min}</p>
          </div>
          <div className="card">
            <div className="label">05 min</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55 }}>{section.presenter5min}</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article>
      <div className="section-tag">
        SEQ {label}/{String(total).padStart(2, "0")} · {section.id.replace(/-/g, " ")}
      </div>
      <h1>{section.title}</h1>

      <div className="card">
        <div className="label mono" style={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)" }}>
          Walkthrough · plain language
        </div>
        <p style={{ margin: "0.35rem 0 0", fontSize: 15, lineHeight: 1.65 }}>{section.plainSummary}</p>
        {activeHelpers.length > 0 ? (
          <details className="inline-help">
            <summary>Quick term helper</summary>
            <div className="term-chip-wrap">
              {activeHelpers.map((item) => (
                <span key={item.term} className="term-chip">
                  {item.term}: {item.simple}
                </span>
              ))}
            </div>
          </details>
        ) : null}
      </div>

      {section.keyClaims.length > 0 ? (
        <>
          <h2>What the paper actually reports</h2>
          <div className="card">
            <ul className="plain">
              {section.keyClaims.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </>
      ) : null}

      {section.id === "results" && tables
        ? tables.map((t) => <DataTable key={t.id} spec={t} />)
        : null}

      {section.id === "results" ? <ResultsStoryChart /> : null}
      {section.id === "results" ? <FigureBisChart /> : null}

      {section.glossary.length > 0 ? (
        <>
          <h2>Terms and ideas — explained</h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 0, maxWidth: 720 }}>
            Short definitions below stay faithful to how the study used each idea. Examples and analogies are here to build intuition; they
            do not replace the paper&apos;s own wording.
          </p>
          <div className="card glossary-grid">
            {section.glossary.map((g) => (
              <div key={g.term}>
                <div className="glossary-term">{g.term}</div>
                <div style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.6 }}>{g.definition}</div>
                {g.example ? (
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: "0.5rem", lineHeight: 1.55 }}>
                    <span style={{ fontWeight: 600, color: "var(--te-orange-dim)" }}>In this study: </span>
                    {g.example}
                  </div>
                ) : null}
                {g.analogy ? (
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: "0.4rem", lineHeight: 1.55, fontStyle: "italic" }}>
                    <span style={{ fontWeight: 600, fontStyle: "normal", color: "var(--text-muted)" }}>Picture it: </span>
                    {g.analogy}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </>
      ) : null}

      {section.quiz.length > 0 ? (
        <>
          <h2>Check your understanding</h2>
          <div className="card quiz">
            {section.quiz.map((item, i) => (
              <div key={i} className="quiz-item">
                <div className="quiz-q">{item.q}</div>
                <details>
                  <summary>Reveal answer</summary>
                  <div className="answer">{item.a}</div>
                </details>
              </div>
            ))}
          </div>
        </>
      ) : null}

      <h2>Presenter / teacher cues</h2>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 0 }}>
        Optional soundbites if you are explaining this section aloud—you can ignore them when reading quietly.
      </p>
      <div className="presenter">
        <div className="card">
          <div className="label">01 min</div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55 }}>{section.presenter1min}</p>
        </div>
        <div className="card">
          <div className="label">05 min</div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55 }}>{section.presenter5min}</p>
        </div>
      </div>
    </article>
  );
}
