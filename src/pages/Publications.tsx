import { useMemo, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PublicationCard from "../components/publications/PublicationCard";
import PublicationFilters, { type SortOrder } from "../components/publications/PublicationFilters";
import PublicationSearch from "../components/publications/PublicationSearch";
import PublicationStats from "../components/publications/PublicationStats";
import { publications, type Publication } from "../data/publications";

type YearFilter = number | "all";
type TypeFilter = Publication["type"] | "all";
type AreaFilter = string | "all";

const TYPE_ORDER: Publication["type"][] = [
  "Journal Article",
  "Conference Paper",
  "Book Chapter",
  "Preprint",
  "Other",
];

function Publications() {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState<YearFilter>("all");
  const [type, setType] = useState<TypeFilter>("all");
  const [area, setArea] = useState<AreaFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const years = useMemo(
    () => Array.from(new Set(publications.map((pub) => pub.year))).sort((a, b) => b - a),
    []
  );

  const types = useMemo(
    () => TYPE_ORDER.filter((t) => publications.some((pub) => pub.type === t)),
    []
  );

  const researchAreas = useMemo(
    () =>
      Array.from(new Set(publications.flatMap((pub) => pub.researchAreas))).sort((a, b) =>
        a.localeCompare(b)
      ),
    []
  );

  const filteredPublications = useMemo(() => {
    const query = search.trim().toLowerCase();

    const results = publications.filter((pub) => {
      const matchesSearch =
        query.length === 0 ||
        pub.title.toLowerCase().includes(query) ||
        pub.authors.some((author) => author.toLowerCase().includes(query)) ||
        pub.venue.toLowerCase().includes(query) ||
        pub.researchAreas.some((researchArea) => researchArea.toLowerCase().includes(query)) ||
        String(pub.year).includes(query);

      const matchesYear = year === "all" || pub.year === year;
      const matchesType = type === "all" || pub.type === type;
      const matchesArea = area === "all" || pub.researchAreas.includes(area);

      return matchesSearch && matchesYear && matchesType && matchesArea;
    });

    return [...results].sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return b.year - a.year || a.title.localeCompare(b.title);
        case "oldest":
          return a.year - b.year || a.title.localeCompare(b.title);
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [search, year, type, area, sortOrder]);

  const hasActiveFilters =
    search.trim().length > 0 || year !== "all" || type !== "all" || area !== "all";

  const clearFilters = () => {
    setSearch("");
    setYear("all");
    setType("all");
    setArea("all");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24 sm:pt-40">
        <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-10">
          <header>
            <p className="section-eyebrow">Research</p>
            <h1 className="section-title">Publications</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              Selected research publications, journal articles, conference papers, and other
              academic contributions.
            </p>
            <PublicationStats total={publications.length} />
          </header>

          <div className="mt-10 flex flex-col gap-5">
            <PublicationSearch value={search} onChange={setSearch} />
            <PublicationFilters
              years={years}
              types={types}
              researchAreas={researchAreas}
              selectedYear={year}
              selectedType={type}
              selectedArea={area}
              sortOrder={sortOrder}
              onYearChange={setYear}
              onTypeChange={setType}
              onAreaChange={setArea}
              onSortChange={setSortOrder}
              onClear={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>

          <p className="mt-8 text-sm text-text-secondary" role="status" aria-live="polite">
            Showing {filteredPublications.length} of {publications.length} publications
          </p>

          {filteredPublications.length > 0 ? (
            <div className="mt-6 flex flex-col gap-5">
              {filteredPublications.map((pub, index) => (
                <PublicationCard key={pub.id} publication={pub} index={index} />
              ))}
            </div>
          ) : (
            <div className="mt-16 flex flex-col items-center gap-3 rounded-card border border-border bg-surface px-6 py-16 text-center">
              <p className="text-lg font-bold text-text-primary">No publications found</p>
              <p className="text-sm text-text-secondary">Try changing your search or filters.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-3 rounded-button border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Publications;
