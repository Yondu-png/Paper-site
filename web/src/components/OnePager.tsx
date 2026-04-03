import meta from "../../../content/meta.json";

export function OnePager() {
  return (
    <div className="print-onepager">
      <h1 style={{ fontSize: 18 }}>One-pager — conference / teaching</h1>
      <p className="mono" style={{ fontSize: 10 }}>
        {meta.title}
      </p>
      <p style={{ fontSize: 12 }}>{meta.authors.join(", ")}</p>
      <p style={{ fontSize: 10, lineHeight: 1.45 }}>
        Quick version in simple words. Numbers stay the same as the paper.
      </p>
      <hr style={{ border: "none", borderTop: "1px solid #000", margin: "12px 0" }} />
      <ul style={{ fontSize: 11, paddingLeft: 16, lineHeight: 1.45 }}>
        <li>
          <strong>Who was studied:</strong> 150 people with OCD (obsessive-compulsive disorder) in treatment vs 131 healthy controls (comparison group).{" "}
          <strong>Any behavioural screen positive:</strong> about 70% vs 58%, p &lt; 0.036 (low chance this gap is random).
        </li>
        <li>
          <strong>Biggest yes/no gaps:</strong> Internet 29.3% vs 3.1%; pornography 12.7% vs 0%; sex-related screen 10% vs 1.5%.
        </li>
        <li>
          <strong>How strong the problems were:</strong> OCD group scored higher for internet, mobile, pornography, sex, and food. For compulsive buying, p = 0.055 (very close, but above the usual 0.05 line).
        </li>
        <li>
          <strong>Inside OCD (with vs without any BA screen):</strong> BA-positive (behavioural addiction screen-positive) group was more often male, younger at OCD start and at study visit, and had higher BIS scores (impulsivity scores). Y-BOCS (OCD severity score) was <strong>not</strong> higher.
        </li>
        <li>
          <strong>Impulsivity ladder (average ± spread):</strong> HC 55.84±12.80 · OCD 66.80±10.25 · OCD+BA 73.73±12.27 · ANOVA (three-group average test) p &lt; 0.001.
        </li>
        <li>
          <strong>Stats tools used:</strong> SPSS 21 · chi-square (count comparison) for yes/no tables · Mann-Whitney (rank comparison) for OCD vs control severity · t-test and chi-square inside OCD · ANOVA for BIS across three groups.
        </li>
        <li>
          <strong>Honest limits:</strong> one clinic, one time point (cannot prove cause), cut-offs mean "higher risk" not diagnosis, and people may under-report sensitive behaviours.
        </li>
      </ul>
      <p className="mono" style={{ fontSize: 9, marginTop: 16 }}>
        {meta.doi}
      </p>
    </div>
  );
}
