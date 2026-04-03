const FLOW = [
  { id: "recruit", title: "Recruit", text: "320 new OCD registrations in study window." },
  { id: "screen", title: "Screen", text: "Exclusions + refusals applied using study criteria." },
  { id: "final", title: "Final sample", text: "150 OCD and 131 healthy controls completed." },
  { id: "compare", title: "Compare", text: "Run prevalence, severity, subgroup, and impulsivity analyses." },
];

export function MethodsFlow() {
  return (
    <section className="card">
      <div className="section-tag">Methods flow · from clinic to analysis</div>
      <div className="flowline">
        {FLOW.map((step, idx) => (
          <div key={step.id} className="flowstep">
            <div className="flowbadge mono">Step {idx + 1}</div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
