import { FiX } from "react-icons/fi";
import type { Publication } from "../../data/publications";

export type SortOrder = "newest" | "oldest" | "title-asc" | "title-desc";

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title-asc", label: "Title A–Z" },
  { value: "title-desc", label: "Title Z–A" },
];

interface PublicationFiltersProps {
  years: number[];
  types: Publication["type"][];
  researchAreas: string[];
  selectedYear: number | "all";
  selectedType: Publication["type"] | "all";
  selectedArea: string | "all";
  sortOrder: SortOrder;
  onYearChange: (value: number | "all") => void;
  onTypeChange: (value: Publication["type"] | "all") => void;
  onAreaChange: (value: string | "all") => void;
  onSortChange: (value: SortOrder) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const selectClasses =
  "w-full rounded-button border border-border bg-surface px-3.5 py-2.5 text-sm text-text-primary shadow-soft transition-colors duration-200 focus-visible:border-primary sm:w-auto";

function PublicationFilters({
  years,
  types,
  researchAreas,
  selectedYear,
  selectedType,
  selectedArea,
  sortOrder,
  onYearChange,
  onTypeChange,
  onAreaChange,
  onSortChange,
  onClear,
  hasActiveFilters,
}: PublicationFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="filter-year" className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
          Year
        </label>
        <select
          id="filter-year"
          value={selectedYear}
          onChange={(event) =>
            onYearChange(event.target.value === "all" ? "all" : Number(event.target.value))
          }
          className={selectClasses}
        >
          <option value="all">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="filter-type" className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
          Publication Type
        </label>
        <select
          id="filter-type"
          value={selectedType}
          onChange={(event) => onTypeChange(event.target.value as Publication["type"] | "all")}
          className={selectClasses}
        >
          <option value="all">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="filter-area" className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
          Research Area
        </label>
        <select
          id="filter-area"
          value={selectedArea}
          onChange={(event) => onAreaChange(event.target.value)}
          className={selectClasses}
        >
          <option value="all">All Areas</option>
          {researchAreas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="filter-sort" className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
          Sort By
        </label>
        <select
          id="filter-sort"
          value={sortOrder}
          onChange={(event) => onSortChange(event.target.value as SortOrder)}
          className={selectClasses}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onClear}
        disabled={!hasActiveFilters}
        className="inline-flex items-center gap-1.5 rounded-button border border-border px-3.5 py-2.5 text-sm font-semibold text-text-secondary transition-colors duration-200 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-text-secondary"
      >
        <FiX size={14} />
        Clear Filters
      </button>
    </div>
  );
}

export default PublicationFilters;
