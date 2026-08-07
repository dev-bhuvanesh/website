export interface NavLink {
  label: string;
  to: string;
}

export interface Badge {
  id: string;
  label: string;
  description: string;
}

export interface ScopeItem {
  name: string;
}

export interface AuthorItem {
  title: string;
  description: string;
}

export interface GuidelineItem {
  title: string;
  points: string[];
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface EditorialMember {
  name: string;
  role: string;
  affiliation: string[];
  email?: string;
  linkedin?: string;
  photo?: string;
}

export const journal = {
  name: "Benevolent International Journal of Multidisciplinary Research",
  shortName: "BIJMR",
  tagline: "International • Peer-Reviewed • Multidisciplinary Research",
  intro:
    "BIJMR is an international, peer-reviewed journal publishing original research articles, review articles, and book reviews within multidisciplinary fields of social sciences.",
  about: [
    "Benevolent International Journal of Multidisciplinary Research (BIJMR) is an international, peer-reviewed journal that aims to publish original articles, review articles, and book reviews within the multidisciplinary fields of social sciences. BIJMR serves as a platform for researchers, scholars, and practitioners to disseminate their research findings and insights, fostering interdisciplinary collaboration and knowledge exchange.",
    "The journal welcomes contributions from diverse disciplines, including educational sciences, business, medical sciences, nursing, languages, tourism and hospitality, and management sciences, as well as other related fields such as linguistics, demographics, social and cultural studies, political sciences, law, communication arts, and economics.",
  ],
  manuscriptScope:
    "Manuscripts with research content from multiple subject fields under the aims and scope of the journal, and/or presenting potential applications of the research findings, will be preferably considered for peer review. This should be explicitly explained in the cover letter when submitting manuscripts for publication.",
  contactEmail: "benevolenttrust@gmail.com",
  // TODO: replace with the real "Submit Article" Google Form link.
  submitFormUrl: "#",
};

export const badges: Badge[] = [
  {
    id: "international",
    label: "International",
    description: "Welcoming research contributions and submissions from scholars worldwide.",
  },
  {
    id: "peer-reviewed",
    label: "Peer-Reviewed",
    description: "All submissions undergo a peer-review process prior to publication.",
  },
  {
    id: "multidisciplinary",
    label: "Multidisciplinary",
    description: "Publishing research that spans and connects multiple subject fields.",
  },
];

export const scopeAreas: ScopeItem[] = [
  { name: "Educational Sciences" },
  { name: "Business" },
  { name: "Medical Sciences" },
  { name: "Nursing" },
  { name: "Languages" },
  { name: "Tourism & Hospitality" },
  { name: "Management Sciences" },
  { name: "Linguistics" },
  { name: "Demographics" },
  { name: "Social & Cultural Studies" },
  { name: "Political Sciences" },
  { name: "Law" },
  { name: "Communication Arts" },
  { name: "Economics" },
  { name: "Other Related Multidisciplinary Fields" },
];

export const forAuthors: AuthorItem[] = [
  {
    title: "Original Research Articles",
    description:
      "Original studies presenting new findings, methods, or data within the journal's multidisciplinary scope.",
  },
  {
    title: "Review Articles",
    description:
      "Critical, comprehensive reviews that synthesize and evaluate existing research within a field or across disciplines.",
  },
  {
    title: "Book Reviews",
    description:
      "Scholarly reviews of recently published books relevant to the journal's areas of research.",
  },
  {
    title: "Multidisciplinary Research",
    description:
      "Studies that draw on research from multiple subject fields within the journal's aims and scope.",
  },
  {
    title: "Research with Practical Applications",
    description:
      "Findings that present potential real-world applications, explained clearly in the author's cover letter.",
  },
];

export const whyPublish: FeatureItem[] = [
  {
    title: "Rapid Publication & Verifiable Certification",
    description:
      "We process and publish your research in a highly accelerated timeframe. Upon publication, all authors instantly receive official, online-verifiable digital certificates.",
  },
  {
    title: "ISSN + ISBN Under One Roof",
    description:
      "Authors can publish standard journal articles with an ISSN (Online) and special conference/book proceedings with an ISBN, all on a single unified platform.",
  },
  {
    title: "Bilingual Support (English & Tamil)",
    description:
      "We embrace linguistic diversity. You can directly submit and publish your high-quality research papers natively in either English or Tamil.",
  },
  {
    title: "Transparent & Flexible Pricing",
    description:
      "We offer a transparent pricing model where authors can choose the plan that best fits their needs. A single publication fee covers up to 5 co-authors, making it highly cost-effective and burden-free for PhD scholars and collaborative research teams.",
  },
  {
    title: "Exclusive 1-Page Summary Report",
    description:
      "To assist you during job interviews, college committee evaluations, or submissions to higher authorities, we provide a professionally condensed 1-page summary statement of your entire full-length article.",
  },
  {
    title: "Comprehensive Evaluation Report",
    description:
      "Our editorial board provides a detailed analytical report highlighting the strengths, areas for improvement, and the exact justification for publication. This serves as a strong professional credential for your academic career and promotions.",
  },
];

export const editorialBoard: EditorialMember[] = [
  {
    name: "Dr. L. Vijayakumar",
    role: "Editor-in-Chief",
    affiliation: [
      "Assistant Professor, Saveetha University, Chennai",
      "Chief Executive Officer, Benevolent Trust, Puducherry",
    ],
    email: "benevolenttrust@gmail.com",
    linkedin: "https://www.linkedin.com/in/vijay-kumar-7449361a8",
  },
];

export const authorGuidelines: GuidelineItem[] = [
  {
    title: "File Format",
    points: [
      "Manuscripts must be submitted in MS Word (.doc or .docx) format only. PDF format will not be accepted.",
    ],
  },
  {
    title: "Page Limit",
    points: ["The manuscript should be between 5 to 15 pages in length."],
  },
  {
    title: "Font Style & Size",
    points: [
      "For English manuscripts: Times New Roman, size 12, 1.5 line spacing.",
      "For Tamil manuscripts: Unicode fonts (e.g., Latha, Arial Unicode MS) must be used, size 11, 1.5 line spacing.",
    ],
  },
  {
    title: "References",
    points: [
      "The references provided at the end of the manuscript must follow either the APA (American Psychological Association) or IEEE citation style.",
    ],
  },
  {
    title: "Originality & Plagiarism",
    points: [
      "Submitted manuscripts must be entirely original work of the author(s).",
      "The plagiarism/similarity index of the manuscript must strictly be within a maximum of 15% (up to 20%). Manuscripts exceeding this limit will be rejected.",
    ],
  },
  {
    title: "Review Process",
    points: [
      "All submitted manuscripts will undergo a Double-Blind Peer Review process by our Editorial Board.",
      "The decision on the manuscript's acceptance or rejection will be communicated via email within 3 to 5 working days.",
    ],
  },
  {
    title: "Submission & Packages",
    points: [
      "Manuscripts must be submitted exclusively through the \"Submit Article\" (Google Form) link available on our website. Submissions sent via email will not be accepted.",
      "Once a manuscript is selected for publication, authors must choose one of the packages (Basic, Premium, or Ultimate) listed on our website, based on their requirements, and pay the corresponding Article Processing Charge (APC).",
    ],
  },
  {
    title: "Plagiarism Report",
    points: [
      "Authors must mandatorily attach an official plagiarism check report (e.g., Turnitin, iThenticate, DrillBit, or any reliable software results) along with their manuscript.",
    ],
  },
  {
    title: "Copyright & Declaration",
    points: [
      'In the article submission Google Form, it is mandatory to tick the Declaration Checkbox confirming: "This is my original work and has not been published elsewhere."',
      "For copyright and legal protection, authors must keep their Digital Signature ready to be uploaded as an image file (PNG or JPG).",
    ],
  },
];

export const navLinks: NavLink[] = [
  { label: "Home", to: "/bijmr" },
  { label: "About", to: "/bijmr#about" },
  { label: "Editorial Board", to: "/bijmr/editorial-board" },
  { label: "Aims & Scope", to: "/bijmr#scope" },
  { label: "Author Guidelines", to: "/bijmr/author-guidelines" },
  { label: "Publication Ethics", to: "/bijmr/publication-ethics" },
  { label: "Current Issue", to: "/bijmr/current-issue" },
  { label: "Archives", to: "/bijmr/archives" },
  { label: "Contact", to: "/bijmr#contact" },
];

export const footerLinks: NavLink[] = [
  { label: "About", to: "/bijmr#about" },
  { label: "Aims & Scope", to: "/bijmr#scope" },
  { label: "Author Guidelines", to: "/bijmr/author-guidelines" },
  { label: "Publication Ethics", to: "/bijmr/publication-ethics" },
  { label: "Current Issue", to: "/bijmr/current-issue" },
  { label: "Archives", to: "/bijmr/archives" },
  { label: "Benevolent Trust", to: "/" },
];
