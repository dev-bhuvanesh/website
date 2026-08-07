export interface ResearchArea {
  name: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface ExperienceItem {
  role: string;
  institution: string;
  period: string;
}

export interface Award {
  id: string;
  name: string;
  organization: string;
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
  university: "Saveetha University, Chennai",
  secondaryRole: {
    title: "Chief Executive Officer",
    organization: "Benevolent Trust",
    location: "Puducherry",
  },
  department: "Department of Computer Science & Engineering",
  office: "Pondicherry, Puducherry, India",
  email: "benevolenttrust@gmail.com",
  phone: "+91 96293 16672",
  address: "Pondicherry, Puducherry, India",
  cvUrl: "#",
  intro:
    "I am a computer scientist working at the intersection of artificial intelligence and computer vision, with a focus on building models that reason reliably under uncertainty. My lab partners with clinical and industry collaborators to translate research into real-world systems.",
  bio: [
    "Dr. L. Vijayakumar is an educator, social-service professional, and community leader from Puducherry. He serves as the CEO of Benevolent Trust and works as an Assistant Professor at Saveetha University, Chennai. With years of experience in social service, fundraising, public awareness, and education, he is also associated with Benevolent International Journal of Multidisciplinary Research (BIJMR), supporting research and knowledge sharing across diverse academic fields.",
  ],
  socials: {
    scholar: "https://scholar.google.com",
    researchgate: "https://www.researchgate.net",
    orcid: "https://orcid.org",
    linkedin: "https://www.linkedin.com/in/vijay-kumar-7449361a8",
  },
};

export const researchAreas: ResearchArea[] = [
  { name: "Artificial Intelligence" },
  { name: "Machine Learning" },
  { name: "Computer Vision" },
  { name: "Data Science" },
];

export const education: EducationItem[] = [
  { degree: "Ph.D. in Computer Science", institution: "Caltech Institute of Technology", year: "2008" },
  { degree: "M.S. in Computer Science", institution: "University of Toronto", year: "2004" },
  { degree: "B.S. in Mathematics & Computer Science", institution: "University of Edinburgh", year: "2002" },
];

export const experience: ExperienceItem[] = [
  { role: "Professor of Computer Science", institution: "Meridian Institute of Technology", period: "2018 – Present" },
  { role: "Associate Professor", institution: "Meridian Institute of Technology", period: "2013 – 2018" },
  { role: "Postdoctoral Researcher", institution: "Whitmore AI Institute", period: "2008 – 2012" },
];

export const stats: StatItem[] = [
  { id: "publications", label: "Publications", value: "112" },
  { id: "awards", label: "Awards", value: "18" },
  { id: "experience", label: "Years of Experience", value: "17" },
  { id: "projects", label: "Research Projects", value: "34" },
];

export const awards: Award[] = [
  {
    id: "award-1",
    name: "Distinguished Researcher Award",
    organization: "Presented by Shri. K. Lakshminarayanan",
    year: "2022",
  },
];
