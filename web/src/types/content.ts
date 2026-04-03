export type GlossaryEntry = {
  term: string;
  definition: string;
  /** Optional concrete scenario, often tied to this paper */
  example?: string;
  /** Optional intuitive comparison for non-specialists */
  analogy?: string;
};

export type CourseSection = {
  id: string;
  title: string;
  plainSummary: string;
  keyClaims: string[];
  glossary: GlossaryEntry[];
  quiz: { q: string; a: string }[];
  presenter1min: string;
  presenter5min: string;
};

export type TableColumn = { key: string; header: string; role: string };

export type GenericTable = {
  id: string;
  label: string;
  title: string;
  source: string;
  columns: TableColumn[];
  footnote?: string;
  cellGuide?: string;
  rows: Record<string, string>[];
  anomalies?: string[];
};
