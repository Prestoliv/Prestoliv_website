/** Core + specialized services for GTM service_interest tracking */
export const CORE_SERVICE_INTERESTS = {
  residential: "residential_construction",
  commercial: "commercial_construction",
  interiors: "interior_design",
} as const;

export const SPECIALIZED_SERVICE_CARDS: ReadonlyArray<{
  label: string;
  interest: string;
}> = [
  {
    label: "Architectural design and VR walkthroughs.",
    interest: "architectural_design_vr_walkthroughs",
  },
  {
    label: "Project management for already-started builds.",
    interest: "project_management",
  },
  {
    label: "Integrated vastu consultation.",
    interest: "vastu_consultation",
  },
  {
    label: "Structural audits and renovation feasibility.",
    interest: "structural_audits_renovation",
  },
  {
    label: "Construction loan facilitation and documentation.",
    interest: "construction_loan_facilitation",
  },
  {
    label: "Independent quality and milestone tracking.",
    interest: "quality_milestone_tracking",
  },
];

export const FOOTER_SERVICE_LINKS: ReadonlyArray<{
  label: string;
  href: string;
  interest: string;
}> = [
  { label: "Residential Construction", href: "/services/residential", interest: "residential_construction" },
  { label: "Commercial Construction", href: "/services/commercial", interest: "commercial_construction" },
  { label: "Interior Design", href: "/services/interiors", interest: "interior_design" },
];
