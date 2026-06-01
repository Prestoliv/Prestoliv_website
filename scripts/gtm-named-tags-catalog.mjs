/**
 * Named GTM tags (ctruth-style): GA4 | Section | Action
 * Each entry → one Custom Event trigger + one GA4 Event tag.
 * Filters must match dataLayer from src/lib/analytics/.
 */

export const LEAD_SOURCES = [
  { id: "hero", section: "Home", action: "Get Started" },
  { id: "navbar_desktop", section: "Navbar Desktop", action: "Get Started" },
  { id: "navbar_mobile", section: "Navbar Mobile", action: "Get Started" },
  { id: "navbar_services_menu", section: "Navbar Services", action: "Book a Call" },
  { id: "footer_cta", section: "Footer", action: "Start Your Project" },
  { id: "calculator_sidebar", section: "Calculator", action: "Sidebar Get Quote" },
  { id: "calculator_empty_state", section: "Calculator", action: "Empty State Get Quote" },
  { id: "calculator_page_hero", section: "Calculator Page", action: "Get Started" },
  { id: "service_residential", section: "Residential", action: "Book Consultation" },
  { id: "service_commercial", section: "Commercial", action: "Book Consultation" },
  { id: "service_interiors", section: "Interiors", action: "Book Consultation" },
  { id: "process_page", section: "Process", action: "Start Your Project" },
  { id: "about_page", section: "About", action: "Contact Us" },
  { id: "services_hub_hero", section: "Services Hub", action: "Book Consultation" },
  { id: "services_hub_specialized", section: "Services Hub", action: "Talk to Team" },
  { id: "home_why_choose", section: "Home", action: "Why Choose Us Consultation" },
];

export const CONSULTATION_FUNNEL = [
  {
    event: "consultation_modal_open",
    step: "Modal Open",
    ga4Event: "consultation_modal_open",
    params: ["lead_source", "page_path", "content_group", "button_id"],
  },
  {
    event: "consultation_modal_close",
    step: "Modal Close",
    ga4Event: "consultation_modal_close",
    params: ["lead_source", "page_path", "content_group", "button_id"],
  },
  {
    event: "consultation_form_start",
    step: "Form Start",
    ga4Event: "consultation_form_start",
    params: ["lead_source", "page_path", "content_group", "button_id"],
  },
  {
    event: "consultation_form_submit",
    step: "Lead Submitted",
    ga4Event: "generate_lead",
    params: ["lead_source", "service_type", "city", "has_email", "button_id"],
  },
  {
    event: "consultation_form_error",
    step: "Form Error",
    ga4Event: "consultation_form_error",
    params: ["lead_source", "error_message", "button_id"],
  },
];

export const PAGE_VIEWS = [
  { contentGroup: "home", section: "Home" },
  { contentGroup: "process", section: "Process" },
  { contentGroup: "about", section: "About" },
  { contentGroup: "calculator", section: "Calculator" },
  { contentGroup: "services_hub", section: "Services Hub" },
  { contentGroup: "service_residential", section: "Residential" },
  { contentGroup: "service_commercial", section: "Commercial" },
  { contentGroup: "service_interiors", section: "Interiors" },
];

export const SCROLL_MILESTONES = [25, 50, 75, 100];

export const CTA_CLICKS = [
  { ctaId: "calculate_cost", section: "Residential", action: "Calculate Cost", location: "service_residential" },
  { ctaId: "calculate_cost", section: "Commercial", action: "Calculate Cost", location: "service_commercial" },
  { ctaId: "calculate_cost", section: "Interiors", action: "Calculate Cost", location: "service_interiors" },
  { ctaId: "calculate_cost", section: "Home Hero", action: "Calculate Cost", location: "hero" },
  { ctaId: "calculate_cost", section: "Services Hub Hero", action: "Calculate Cost", location: "services_hub_hero" },
  { ctaId: "calculate_cost", section: "Services Hub | Residential", action: "Calculate Cost", location: "services_hub_residential" },
  { ctaId: "calculate_cost", section: "Services Hub | Commercial", action: "Calculate Cost", location: "services_hub_commercial" },
  { ctaId: "calculate_cost", section: "Services Hub | Interiors", action: "Calculate Cost", location: "services_hub_interiors" },
  { ctaId: "view_service_details", section: "Services Hub | Residential", action: "View Details", location: "services_hub_residential" },
  { ctaId: "view_service_details", section: "Services Hub | Commercial", action: "View Details", location: "services_hub_commercial" },
  { ctaId: "view_service_details", section: "Services Hub | Interiors", action: "View Details", location: "services_hub_interiors" },
  { ctaId: "explore_specialized", section: "Services Hub", action: "Get Cost Estimate", location: "services_hub_specialized" },
  { ctaId: "home_why_choose_process", section: "Home", action: "See Our Process", location: "home_why_choose_us" },
  { ctaId: "home_service_planning", section: "Home Services", action: "Visionary Planning", location: "home_services" },
  { ctaId: "home_service_execution", section: "Home Services", action: "Transparent Execution", location: "home_services" },
  { ctaId: "home_service_handover", section: "Home Services", action: "Quality Handover", location: "home_services" },
  { ctaId: "bento_virtual_design", section: "Home Bento", action: "Virtual-First Design", location: "home_bento" },
  { ctaId: "bento_live_tracking", section: "Home Bento", action: "Live Project Tracking", location: "home_bento" },
  { ctaId: "bento_accountability", section: "Home Bento", action: "Full-Stack Accountability", location: "home_bento" },
  { ctaId: "bento_timelines", section: "Home Bento", action: "Data-Driven Timelines", location: "home_bento" },
];

export const SERVICE_INTEREST = [
  { slug: "residential", section: "Residential" },
  { slug: "commercial", section: "Commercial" },
  { slug: "interiors", section: "Interiors" },
];

export const CALCULATOR_EVENTS = [
  { event: "calculator_started", action: "Started", ga4Event: "view_item", params: ["package_count"] },
  { event: "calculator_area_updated", action: "Area Updated", ga4Event: "calculator_area_updated", params: ["area_value", "area_unit", "built_up_sqft", "estimate_inr"] },
  { event: "calculator_unit_changed", action: "Unit Changed", ga4Event: "calculator_unit_changed", params: ["area_unit"] },
  { event: "calculator_package_selected", action: "Package Selected", ga4Event: "select_item", params: ["package_id", "package_label", "estimate_inr"] },
  { event: "calculator_estimate_viewed", action: "Estimate Viewed", ga4Event: "calculator_estimate_viewed", params: ["estimate_inr", "package_label"] },
  { event: "calculator_reset", action: "Reset", ga4Event: "calculator_reset", params: [] },
  { event: "calculator_cta_click", action: "CTA Click", ga4Event: "calculator_cta_click", params: ["cta_id", "cta_text", "cta_location"] },
];

export const SOCIAL_PLATFORMS = [
  { platform: "instagram", label: "Instagram" },
  { platform: "linkedin", label: "LinkedIn" },
  { platform: "facebook", label: "Facebook" },
];

/** @returns {import('./gtm-named-tags-catalog.mjs').NamedTagDef[]} */
export function buildNamedTagCatalog() {
  const tags = [];

  for (const page of PAGE_VIEWS) {
    tags.push({
      tagName: `GA4 | Page | ${page.section} View`,
      triggerName: `Page | ${page.section} View`,
      event: "virtual_page_view",
      ga4Event: "page_view",
      filters: [{ key: "content_group", value: page.contentGroup }],
      params: ["page_path", "page_title", "page_location", "content_group"],
    });
  }

  for (const source of LEAD_SOURCES) {
    for (const step of CONSULTATION_FUNNEL) {
      tags.push({
        tagName: `GA4 | ${source.section} | ${source.action} | ${step.step}`,
        triggerName: `${source.section} | ${source.action} | ${step.step}`,
        event: step.event,
        ga4Event: step.ga4Event,
        filters: [{ key: "lead_source", value: source.id }],
        params: [
          ...step.params,
          "page_path",
          "content_group",
          "event_category",
          "event_action",
        ],
      });
    }
  }

  for (const pct of SCROLL_MILESTONES) {
    tags.push({
      tagName: `GA4 | Engagement | Scroll ${pct}%`,
      triggerName: `Engagement | Scroll ${pct}%`,
      event: "scroll_depth",
      ga4Event: "scroll_depth",
      filters: [{ key: "scroll_percent", value: String(pct) }],
      params: ["scroll_percent", "page_path", "content_group"],
    });
  }

  for (const cta of CTA_CLICKS) {
    const filters = [{ key: "cta_id", value: cta.ctaId }];
    if (cta.location) filters.push({ key: "cta_location", value: cta.location });
    tags.push({
      tagName: `GA4 | ${cta.section} | ${cta.action}`,
      triggerName: `${cta.section} | ${cta.action}`,
      event: "cta_click",
      ga4Event: "cta_click",
      filters,
      params: ["cta_id", "cta_text", "cta_location", "cta_destination", "button_id", "page_path", "content_group"],
    });
  }

  for (const svc of SERVICE_INTEREST) {
    tags.push({
      tagName: `GA4 | ${svc.section} | Service Page View`,
      triggerName: `${svc.section} | Service Interest`,
      event: "view_service_interest",
      ga4Event: "view_item",
      filters: [{ key: "service_slug", value: svc.slug }],
      params: ["service_slug", "interest_location", "page_path", "content_group"],
    });
  }

  for (const calc of CALCULATOR_EVENTS) {
    tags.push({
      tagName: `GA4 | Calculator | ${calc.action}`,
      triggerName: `Calculator | ${calc.action}`,
      event: calc.event,
      ga4Event: calc.ga4Event,
      filters: [],
      params: [...calc.params, "page_path", "content_group"],
    });
  }

  tags.push(
    {
      tagName: "GA4 | FAQ | Expand",
      triggerName: "FAQ | Expand",
      event: "faq_expand",
      ga4Event: "faq_expand",
      filters: [],
      params: ["faq_index", "faq_question", "page_path", "content_group"],
    },
    {
      tagName: "GA4 | Navigation | Link Click",
      triggerName: "Navigation | Link Click",
      event: "navigation_click",
      ga4Event: "click",
      filters: [],
      params: ["link_text", "link_destination", "nav_location", "page_path", "content_group"],
    },
    {
      tagName: "GA4 | Auth | Sign In Start",
      triggerName: "Auth | Sign In Start",
      event: "sign_in_start",
      ga4Event: "login",
      filters: [],
      params: ["method", "page_path", "content_group"],
    },
    {
      tagName: "GA4 | Auth | Sign In Complete",
      triggerName: "Auth | Sign In Complete",
      event: "sign_in_complete",
      ga4Event: "login",
      filters: [],
      params: ["method", "page_path", "content_group"],
    },
    {
      tagName: "GA4 | Auth | Dashboard Open",
      triggerName: "Auth | Dashboard Open",
      event: "dashboard_open",
      ga4Event: "dashboard_open",
      filters: [],
      params: ["page_path", "content_group"],
    },
    {
      tagName: "GA4 | Engagement | Section View",
      triggerName: "Engagement | Section View",
      event: "section_view",
      ga4Event: "section_view",
      filters: [],
      params: ["page_path", "content_group", "event_label"],
    },
    {
      tagName: "GA4 | Navigation | Outbound Link",
      triggerName: "Navigation | Outbound Link",
      event: "outbound_link_click",
      ga4Event: "click",
      filters: [],
      params: ["link_text", "link_destination", "page_path", "content_group"],
    },
  );

  for (const { platform, label } of SOCIAL_PLATFORMS) {
    tags.push({
      tagName: `GA4 | Social | ${label} Click`,
      triggerName: `Social | ${label} Click`,
      event: "social_click",
      ga4Event: "social_click",
      filters: [{ key: "social_platform", value: platform }],
      params: ["social_platform", "social_location", "page_path", "content_group"],
    });
  }

  for (const type of ["phone", "email"]) {
    const label = type === "phone" ? "Phone" : "Email";
    tags.push({
      tagName: `GA4 | Contact | ${label} Click`,
      triggerName: `Contact | ${label} Click`,
      event: "contact_click",
      ga4Event: "contact",
      filters: [{ key: "contact_type", value: type }],
      params: ["contact_type", "contact_location", "page_path", "content_group"],
    });
  }

  return tags;
}
