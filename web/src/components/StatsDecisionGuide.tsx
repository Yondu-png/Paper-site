import { useState } from "react";

type Rule = {
  id: string;
  question: string;
  answer: string;
  explain: string;
};

const RULES: Rule[] = [
  {
    id: "yesNo",
    question: "Data is yes/no counts?",
    answer: "Use chi-square (count comparison test).",
    explain: "Best for questions like 'how many screened positive in each group?'",
  },
  {
    id: "twoSkewed",
    question: "Two groups and skewed number scores?",
    answer: "Use Mann-Whitney U (rank comparison test).",
    explain: "Safer when scores are not bell-shaped.",
  },
  {
    id: "twoAverage",
    question: "Two groups and average-ready number scores?",
    answer: "Use independent-samples t-test.",
    explain: "Compares group means when assumptions are acceptable.",
  },
  {
    id: "threeAverage",
    question: "Three groups and one numeric outcome?",
    answer: "Use one-way ANOVA.",
    explain: "Compares three group means in one overall test.",
  },
  {
    id: "moveTogether",
    question: "Do two numeric scales rise/fall together?",
    answer: "Use correlation.",
    explain: "Shows association, not causation.",
  },
];

export function StatsDecisionGuide() {
  const [active, setActive] = useState<string>(RULES[0].id);
  const rule = RULES.find((item) => item.id === active) ?? RULES[0];

  return (
    <section className="card">
      <div className="section-tag">Stats guide · choose test quickly</div>
      <p style={{ marginTop: 0, fontSize: 14, lineHeight: 1.6 }}>
        Pick the data question below. The guide shows the test name and plain meaning.
      </p>
      <div className="stats-guide-toolbar" style={{ marginBottom: "0.75rem" }}>
        {RULES.map((item) => (
          <button key={item.id} type="button" className={`btn ${active === item.id ? "btn-primary" : ""}`} onClick={() => setActive(item.id)}>
            {item.question}
          </button>
        ))}
      </div>
      <div className="callout-soft">
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
          <strong>Use:</strong> {rule.answer}
        </p>
        <p style={{ margin: "0.35rem 0 0", fontSize: 13, color: "var(--text-muted)" }}>{rule.explain}</p>
      </div>
    </section>
  );
}
