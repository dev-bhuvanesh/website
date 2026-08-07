import { FiSearch } from "react-icons/fi";

interface PublicationSearchProps {
  value: string;
  onChange: (value: string) => void;
}

function PublicationSearch({ value, onChange }: PublicationSearchProps) {
  return (
    <div className="relative">
      <label htmlFor="publication-search" className="sr-only">
        Search publications
      </label>
      <FiSearch
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
        size={18}
      />
      <input
        id="publication-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search publications..."
        className="w-full rounded-button border border-border bg-surface py-3 pl-11 pr-4 text-sm text-text-primary shadow-soft transition-colors duration-200 placeholder:text-text-secondary focus-visible:border-primary"
      />
    </div>
  );
}

export default PublicationSearch;
