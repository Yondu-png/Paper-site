import statsMap from "../../../content/stats-map.json";
import comparisons from "../../../content/comparisons.json";
import ambiguities from "../../../content/ambiguities.json";
import { MethodsFlow } from "./MethodsFlow";
import { StatsDecisionGuide } from "./StatsDecisionGuide";

export function StatsLab() {
  return (
    <div>
      <h2 style={{ marginTop: "1.5rem" }}>Research questions mapped to analyses</h2>
      <p style={{ maxWidth: 720, fontSize: 15, lineHeight: 1.65 }}>
        Each block shows a plain-language question, the test used in the paper, and a simple reason for that test choice. Numbers and test
        choices follow Rai et al. (2022); missing details are flagged below rather than guessed.
      </p>
      <MethodsFlow />
      <StatsDecisionGuide />

      <h2>Question → test → why it matches</h2>
      <div className="card">
        <ul className="plain" style={{ listStyle: "none", padding: 0 }}>
          {statsMap.researchQuestionsToAnalyses.map((row, i) => (
            <li
              key={i}
              style={{
                borderLeft: "3px solid var(--te-orange)",
                paddingLeft: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div className="mono" style={{ fontSize: 11, color: "var(--text-muted)" }}>
                RQ {i + 1}
              </div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{row.rq}</div>
              <div style={{ fontSize: 14, lineHeight: 1.55 }}>
                <span style={{ fontWeight: 600, color: "var(--te-orange-dim)" }}>What the authors ran: </span>
                {row.analysis}
              </div>
              <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 6, lineHeight: 1.6 }}>
                <span style={{ fontWeight: 600, color: "var(--text)" }}>Why this test: </span>
                {row.why}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <h2>SPSS-style workflow (paper used version 21)</h2>
      <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 0, maxWidth: 720 }}>
        These menu paths are a teaching aid: they show how a statistician might click through SPSS to reproduce the <em>logic</em> of the
        paper. Your software version may label menus slightly differently.
      </p>
      <div className="card">
        <ol className="plain" style={{ paddingLeft: "1.2rem" }}>
          {statsMap.spssWorkflow.map((s, i) => (
            <li key={i} style={{ marginBottom: "0.65rem" }}>
              <span className="mono" style={{ fontSize: 11 }}>
                STEP {String(i + 1).padStart(2, "0")}
              </span>{" "}
              — <strong>{s.step}</strong>
              <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}>{s.detail}</div>
            </li>
          ))}
        </ol>
      </div>

      <h2>Quick decision guide: Mann–Whitney vs t-test (and friends)</h2>
      <div className="card">
        <pre
          className="mono"
          style={{
            margin: 0,
            whiteSpace: "pre-wrap",
            fontSize: 12,
            lineHeight: 1.55,
            color: "var(--text)",
          }}
        >
          {`Compare OCD vs healthy controls on symptom INTENSITY (skewed scores)
  → Mann–Whitney U (Table 3)

Compare OCD+BA vs OCD−BA on AVERAGES (e.g. Y-BOCS, BIS subscales)
  → Independent-samples t-test where authors applied it (Table 4)

Compare OCD vs controls on YES/NO caseness by CUT-OFF
  → Chi-square (Table 2)

Compare THREE GROUPS on one impulsivity average (BIS total)
  → One-way ANOVA (Figure 1; overall p < 0.001)`}
        </pre>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: "0.5rem", lineHeight: 1.6 }}>
          <strong style={{ color: "var(--text)" }}>Skew reminder: </strong>
          {statsMap.mannWhitneyVsTtest.thisStudy}
        </p>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 0, lineHeight: 1.6 }}>
          <strong style={{ color: "var(--text)" }}>When t-tests still appeared: </strong>
          {statsMap.mannWhitneyVsTtest.tTestWouldNeed} {statsMap.mannWhitneyVsTtest.ruleOfThumb}
        </p>
      </div>

      <h2>Measure comparison</h2>
      <p className="table-caption">{comparisons.title}</p>
      <div className="table-scroll-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Topic</th>
              <th>BIS-11</th>
              <th>IAT</th>
              <th>TMD brief</th>
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

      <h2>Verification notes (what the PDF does not spell out)</h2>
      <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 0 }}>
        These are honesty checks for presenters and students—places where you should not invent numbers.
      </p>
      <div className="card">
        <ul className="plain">
          {ambiguities.notes.map((n) => (
            <li key={n.id} style={{ marginBottom: "0.75rem" }}>
              <span className="mono" style={{ fontSize: 11 }}>
                {n.id}
              </span>
              <div style={{ fontSize: 14 }}>{n.issue}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{n.action}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
