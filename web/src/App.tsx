import { useEffect, useMemo, useCallback, useState } from "react";
import { Navigate, Route, Routes, useNavigate, useParams, useLocation } from "react-router-dom";
import course from "../../content/course.json";
import table1 from "../../content/tables/table1.json";
import table2 from "../../content/tables/table2.json";
import table3 from "../../content/tables/table3.json";
import table4 from "../../content/tables/table4.json";
import sectionMap from "../../content/section-map.json";
import type { CourseSection, GenericTable } from "./types/content";
import { SectionPage } from "./components/SectionPage";
import { OnePager } from "./components/OnePager";

const sections = course.sections as CourseSection[];
const orderedIds = sectionMap.orderedSectionIds as string[];
const labels = sectionMap.labels as Record<string, string>;

const TABLES: GenericTable[] = [table1, table2, table3, table4] as GenericTable[];

function orderedSections(): CourseSection[] {
  const byId = Object.fromEntries(sections.map((s) => [s.id, s]));
  return orderedIds.map((id) => byId[id]).filter(Boolean);
}

function CourseRoute() {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const list = useMemo(() => orderedSections(), []);
  const idx = list.findIndex((s) => s.id === sectionId);
  const section = idx >= 0 ? list[idx] : null;

  const go = useCallback(
    (delta: number) => {
      if (idx < 0) return;
      const n = idx + delta;
      if (n >= 0 && n < list.length) navigate(`/course/${list[n].id}`);
    },
    [idx, list, navigate]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight" || e.key === "n") go(1);
      if (e.key === "ArrowLeft" || e.key === "p") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!section) {
    return <Navigate to={`/course/${list[0]?.id ?? "abstract"}`} replace />;
  }

  return (
    <>
      <SectionPage section={section} index={idx} total={list.length} tables={section.id === "results" ? TABLES : undefined} />
      <div className="toolbar no-print" style={{ marginTop: "1.5rem" }}>
        <button type="button" className="btn" disabled={idx <= 0} onClick={() => go(-1)}>
          ← Prev
        </button>
        <button type="button" className="btn" disabled={idx >= list.length - 1} onClick={() => go(1)}>
          Next →
        </button>
        <span className="mono" style={{ fontSize: 10, color: "var(--text-muted)", marginLeft: 8 }}>
          Keys: ← → or p / n
        </span>
      </div>
    </>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: "light" | "dark"; onToggle: () => void }) {
  return (
    <div className="segmented no-print" role="group" aria-label="Theme">
      <button type="button" className={theme === "light" ? "active" : ""} onClick={() => theme !== "light" && onToggle()}>
        Day
      </button>
      <button type="button" className={theme === "dark" ? "active" : ""} onClick={() => theme !== "dark" && onToggle()}>
        Night
      </button>
    </div>
  );
}

export default function App() {
  const list = useMemo(() => orderedSections(), []);
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("ocd-ba-theme");
    const initial = saved === "dark" || saved === "light" ? saved : "light";
    document.documentElement.dataset.theme = initial;
    setThemeState(initial);
  }, []);

  const setTheme = (t: "light" | "dark") => {
    document.documentElement.dataset.theme = t;
    localStorage.setItem("ocd-ba-theme", t);
    setThemeState(t);
  };

  const onToggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const pathSectionId = location.pathname.startsWith("/course/") ? location.pathname.replace("/course/", "") : "";
  const activeIndex = list.findIndex((s) => s.id === pathSectionId);
  const progress = activeIndex >= 0 ? ((activeIndex + 1) / list.length) * 100 : 8;

  return (
    <div className="app-shell">
      <aside className="rig-panel">
        <div className="brand-block">
          <div className="brand-kicker">Guided walkthrough · non-clinical friendly</div>
          <p className="brand-title">OCD × Behavioural addictions — Rai et al. 2022</p>
          <p className="mono" style={{ fontSize: 10, color: "var(--text-muted)", margin: "0.35rem 0 0", lineHeight: 1.5 }}>
            Plain-language summaries, analogies, and table guides—facts stay tied to the paper; jargon is unpacked, not replaced with guesses.
          </p>
        </div>
        <div className="toolbar">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button type="button" className="btn no-print" onClick={() => window.print()}>
            Print one-pager
          </button>
        </div>
        <div className="mono" style={{ fontSize: 10, color: "var(--text-muted)" }}>
          Sections · read in order or jump via nav
        </div>
        <nav aria-label="Course sections">
          <ul className="nav-steps">
            {list.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  className={`nav-step${pathSectionId === s.id ? " active" : ""}`}
                  onClick={() => navigate(`/course/${s.id}`)}
                >
                  {labels[s.id] ?? s.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="progress-track no-print" aria-hidden>
          <div className="progress-fill" style={{ width: `${Math.min(100, Math.max(4, progress))}%` }} />
        </div>
      </aside>
      <main className="main-panel" id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Navigate to={`/course/${list[0]?.id ?? "abstract"}`} replace />} />
          <Route path="/course/:sectionId" element={<CourseRoute />} />
          <Route path="*" element={<Navigate to={`/course/${list[0]?.id ?? "abstract"}`} replace />} />
        </Routes>
        <OnePager />
      </main>
    </div>
  );
}
