export interface Publication {
  id: number;
  year: number;
  title: string;
  authors: string[];
  venue: string;
  type:
    | "Journal Article"
    | "Conference Paper"
    | "Book Chapter"
    | "Preprint"
    | "Other";
  abstract: string;
  researchAreas: string[];
  pdfUrl?: string;
  doi?: string;
}

// Left empty deliberately. This list previously held 26 placeholder entries
// credited to "Dr. Elena Whitfield" — a fictional author, not Dr. Vijayakumar.
// Publishing them under his name would have misattributed work, so they were
// removed rather than rewritten. Add real entries here as they are confirmed.
export const publications: Publication[] = [];
