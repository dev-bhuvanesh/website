export interface ResearchArea {
  name: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year?: string;
}

export interface Award {
  id: string;
  name: string;
  organization?: string;
  year: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
}

export const profile = {
  name: "Dr. L. Vijayakumar",
  title: "Assistant Professor",
  university: "Founder & Managing Trustee",
  secondaryRole: {
    title: "Founder & Managing Trustee",
    organization: "Benevolent Trust",
    location: "Puducherry",
  },
  department: "Benevolent Trust, Puducherry",
  office: "Benevolent Trust, Puducherry",
  email: "benevolenttrust@gmail.com",
  phone: "+91 96293 16672",
  address: "Pondicherry, Puducherry, India",
  cvUrl: "#",
  intro:
    "I am an educator and social-service professional from Puducherry. As Founder & Managing Trustee of Benevolent Trust, I work on social service, fundraising, public awareness, and education, alongside my teaching as an Assistant Professor.",
  bio: [
    "Dr. L. Vijayakumar is an educator, social-service professional, and community leader from Puducherry. He is the Founder & Managing Trustee of Benevolent Trust, Puducherry, and works as an Assistant Professor at Veltech University, Chennai. With years of experience in social service, fundraising, public awareness, and education, he is also associated with Benevolent International Journal of Multidisciplinary Research (BIJMR), supporting research and knowledge sharing across diverse academic fields.",
  ],
  socials: {
    scholar: "https://scholar.google.com",
    researchgate: "https://www.researchgate.net",
    orcid: "https://orcid.org",
    linkedin: "https://www.linkedin.com/in/vijay-kumar-7449361a8",
  },
};

export const researchAreas: ResearchArea[] = [
  { name: "Founder" },
  { name: "Social Service" },
  { name: "Professor" },
  { name: "Community Development" },
];

export const education: EducationItem[] = [
  { degree: "Ph.D. in Commerce", institution: "St. Joseph’s College, Cuddalore (Autonomous)" },
  {
    degree: "M.Com. (Master of Commerce)",
    institution: "St. Joseph’s College, Cuddalore (Thiruvalluvar University)",
  },
  { degree: "B.Com. (Bachelor of Commerce)", institution: "[College Name]" },
];

// Left empty deliberately: the previous figures were placeholder values, not
// real ones. The Stats section stays out of the Profile page until Dr.
// Vijayakumar supplies verified counts.
export const stats: StatItem[] = [];

export const awards: Award[] = [
  {
    id: "award-1",
    name: "Distinguished Researcher Award",
    organization: "Presented by Shri. K. Lakshminarayanan",
    year: "2022",
  },
  {
    id: "award-2",
    name: "Publication and International Conference cum PRIMS Awards",
    year: "2021",
  },
];
