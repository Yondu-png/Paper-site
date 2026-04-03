import type { GenericTable } from "../types/content";

type Props = { spec: GenericTable };

export function DataTable({ spec }: Props) {
  const keys = spec.columns.map((c) => c.key);

  return (
    <div className="card">
      <div className="table-caption">
        {spec.label} · {spec.source}
      </div>
      <p style={{ marginTop: 0, fontSize: 14 }}>{spec.title}</p>
      {spec.cellGuide ? (
        <p className="mono" style={{ fontSize: 11, color: "var(--text-muted)" }}>
          {spec.cellGuide}
        </p>
      ) : null}
      <div className="table-scroll-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {spec.columns.map((c) => (
                <th key={c.key} title={c.role}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {spec.rows.map((row, i) => (
              <tr key={i}>
                {keys.map((k) => (
                  <td key={k} className={k !== keys[0] ? "num mono" : ""}>
                    {row[k] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {spec.footnote ? (
        <p className="mono" style={{ fontSize: 10, color: "var(--text-muted)", margin: 0 }}>
          {spec.footnote}
        </p>
      ) : null}
      {spec.anomalies?.map((a) => (
        <p key={a} style={{ fontSize: 12, color: "var(--accent-warn)", margin: "0.5rem 0 0" }}>
          ⚠ {a}
        </p>
      ))}
    </div>
  );
}
