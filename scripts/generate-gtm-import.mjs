/**
 * Generates gtm/prestoliv-analytics-import.json — import via
 * GTM → Admin → Import Container → Merge (prefer) or Overwrite.
 *
 * Usage: node scripts/generate-gtm-import.mjs
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../gtm/prestoliv-analytics-import.json");

const GTM_ID = "GTM-W5G7H4GP";
const GA4_ID = "G-Z21L9R9W4V";
const ALL_PAGES = "2147479553";

const PRESTOLIV_EVENTS = [
  "virtual_page_view",
  "scroll_depth",
  "section_view",
  "navigation_click",
  "outbound_link_click",
  "consultation_modal_open",
  "consultation_modal_close",
  "consultation_form_start",
  "consultation_form_submit",
  "consultation_form_error",
  "calculator_started",
  "calculator_area_updated",
  "calculator_unit_changed",
  "calculator_package_selected",
  "calculator_estimate_viewed",
  "calculator_reset",
  "calculator_cta_click",
  "cta_click",
  "view_service_interest",
  "faq_expand",
  "sign_in_start",
  "sign_in_complete",
  "dashboard_open",
  "contact_click",
  "social_click",
];

const GA4_MAPPED = {
  virtual_page_view: "page_view",
  consultation_form_submit: "generate_lead",
  calculator_package_selected: "select_item",
  calculator_started: "view_item",
  view_service_interest: "view_item",
  navigation_click: "click",
  outbound_link_click: "click",
  sign_in_start: "login",
  sign_in_complete: "login",
};

const DLV_KEYS = [
  "page_path",
  "page_title",
  "page_location",
  "content_group",
  "event_category",
  "event_action",
  "event_label",
  "lead_source",
  "service_type",
  "city",
  "has_email",
  "scroll_percent",
  "cta_id",
  "cta_text",
  "cta_location",
  "link_text",
  "link_destination",
  "nav_location",
  "package_id",
  "package_label",
  "estimate_inr",
  "faq_index",
  "faq_question",
  "social_platform",
  "contact_type",
  "error_message",
  "method",
  "package_count",
  "service_slug",
  "interest_location",
];

let id = 1;
const nextId = () => String(id++);

function dlv(name, key) {
  const varId = nextId();
  return {
    id: varId,
    def: {
      accountId: "0",
      containerId: "0",
      variableId: varId,
      name,
      type: "v",
      parameter: [
        { type: "INTEGER", key: "dataLayerVersion", value: "2" },
        { type: "BOOLEAN", key: "setDefaultValue", value: "false" },
        { type: "TEMPLATE", key: "name", value: key },
      ],
      fingerprint: "1",
      formatValue: {},
    },
  };
}

function customEventTrigger(name, eventName) {
  const triggerId = nextId();
  return {
    id: triggerId,
    def: {
      accountId: "0",
      containerId: "0",
      triggerId,
      name,
      type: "CUSTOM_EVENT",
      customEventFilter: [
        {
          type: "EQUALS",
          parameter: [
            { type: "TEMPLATE", key: "arg0", value: "{{_event}}" },
            { type: "TEMPLATE", key: "arg1", value: eventName },
          ],
        },
      ],
      fingerprint: "1",
    },
  };
}

function regexEventTrigger(name, regex) {
  const triggerId = nextId();
  return {
    id: triggerId,
    def: {
      accountId: "0",
      containerId: "0",
      triggerId,
      name,
      type: "CUSTOM_EVENT",
      customEventFilter: [
        {
          type: "MATCH_REGEX",
          parameter: [
            { type: "TEMPLATE", key: "arg0", value: "{{_event}}" },
            { type: "TEMPLATE", key: "arg1", value: regex },
          ],
        },
      ],
      fingerprint: "1",
    },
  };
}

function eventParams(keys) {
  return {
    type: "LIST",
    key: "eventSettingsTable",
    list: keys.map((key) => ({
      type: "MAP",
      map: [
        { type: "TEMPLATE", key: "parameter", value: key },
        { type: "TEMPLATE", key: "parameterValue", value: `{{DLV - ${key}}}` },
      ],
    })),
  };
}

function ga4EventTag(name, eventName, triggerId, paramKeys) {
  const tagId = nextId();
  return {
    id: tagId,
    def: {
      accountId: "0",
      containerId: "0",
      tagId,
      name,
      type: "gaawe",
      parameter: [
        { type: "BOOLEAN", key: "sendEcommerceData", value: "false" },
        { type: "TEMPLATE", key: "eventName", value: eventName },
        { type: "TEMPLATE", key: "measurementIdOverride", value: GA4_ID },
        eventParams(paramKeys),
      ],
      fingerprint: "1",
      firingTriggerId: [triggerId],
      tagFiringOption: "ONCE_PER_EVENT",
      monitoringMetadata: { type: "MAP" },
      consentSettings: { consentStatus: "NOT_SET" },
    },
  };
}

// --- Build variables ---
const variables = [];
for (const key of DLV_KEYS) {
  variables.push(dlv(`DLV - ${key}`, key));
}

// --- Triggers ---
const tVirtualPageView = customEventTrigger("CE - virtual_page_view", "virtual_page_view");
const tGenerateLead = customEventTrigger("CE - consultation_form_submit", "consultation_form_submit");
const tSelectItem = customEventTrigger("CE - calculator_package_selected", "calculator_package_selected");
const tViewItemCalc = customEventTrigger("CE - calculator_started", "calculator_started");
const tViewItemService = customEventTrigger("CE - view_service_interest", "view_service_interest");
const tLoginStart = customEventTrigger("CE - sign_in_start", "sign_in_start");
const tLoginComplete = customEventTrigger("CE - sign_in_complete", "sign_in_complete");
const tNavigation = customEventTrigger("CE - navigation_click", "navigation_click");

const mappedEvents = new Set(Object.keys(GA4_MAPPED));
const catchAllRegex = PRESTOLIV_EVENTS.filter((e) => !mappedEvents.has(e)).join("|");
const tCatchAll = regexEventTrigger("CE - All Other Prestoliv Events", catchAllRegex);

const triggers = [
  tVirtualPageView,
  tGenerateLead,
  tSelectItem,
  tViewItemCalc,
  tViewItemService,
  tLoginStart,
  tLoginComplete,
  tNavigation,
  tCatchAll,
];

// --- Tags ---
const ga4ConfigTagId = nextId();
const ga4ConfigTag = {
  accountId: "0",
  containerId: "0",
  tagId: ga4ConfigTagId,
  name: "GA4 - Configuration",
  type: "googtag",
  parameter: [
    { type: "TEMPLATE", key: "tagId", value: GA4_ID },
    {
      type: "LIST",
      key: "configSettingsTable",
      list: [
        {
          type: "MAP",
          map: [
            { type: "TEMPLATE", key: "parameter", value: "send_page_view" },
            { type: "TEMPLATE", key: "parameterValue", value: "false" },
          ],
        },
      ],
    },
  ],
  fingerprint: "1",
  firingTriggerId: [ALL_PAGES],
  tagFiringOption: "ONCE_PER_EVENT",
  monitoringMetadata: { type: "MAP" },
  consentSettings: { consentStatus: "NOT_SET" },
};

const tags = [
  ga4ConfigTag,
  ga4EventTag("GA4 - page_view", "page_view", tVirtualPageView.id, [
    "page_path",
    "page_title",
    "page_location",
    "content_group",
  ]).def,
  ga4EventTag("GA4 - generate_lead", "generate_lead", tGenerateLead.id, [
    "lead_source",
    "service_type",
    "city",
    "has_email",
  ]).def,
  ga4EventTag("GA4 - select_item", "select_item", tSelectItem.id, [
    "package_id",
    "package_label",
    "estimate_inr",
  ]).def,
  ga4EventTag("GA4 - view_item (calculator)", "view_item", tViewItemCalc.id, ["package_count"]).def,
  ga4EventTag("GA4 - view_item (service)", "view_item", tViewItemService.id, [
    "service_slug",
    "interest_location",
  ]).def,
  ga4EventTag("GA4 - login (start)", "login", tLoginStart.id, ["method"]).def,
  ga4EventTag("GA4 - login (complete)", "login", tLoginComplete.id, ["method"]).def,
  ga4EventTag("GA4 - click (navigation)", "click", tNavigation.id, [
    "link_text",
    "link_destination",
    "nav_location",
  ]).def,
];

// Catch-all: send dataLayer event name as GA4 event name
const catchAllTagId = nextId();
tags.push({
  accountId: "0",
  containerId: "0",
  tagId: catchAllTagId,
  name: "GA4 - All Other Custom Events",
  type: "gaawe",
  parameter: [
    { type: "BOOLEAN", key: "sendEcommerceData", value: "false" },
    { type: "TEMPLATE", key: "eventName", value: "{{Event}}" },
    { type: "TEMPLATE", key: "measurementIdOverride", value: GA4_ID },
    eventParams([
      "event_category",
      "event_action",
      "event_label",
      "lead_source",
      "scroll_percent",
      "cta_id",
      "cta_text",
      "cta_location",
      "faq_index",
      "social_platform",
      "contact_type",
      "estimate_inr",
      "package_label",
    ]),
  ],
  fingerprint: "1",
  firingTriggerId: [tCatchAll.id],
  tagFiringOption: "ONCE_PER_EVENT",
  monitoringMetadata: { type: "MAP" },
  consentSettings: { consentStatus: "NOT_SET" },
});

const container = {
  exportFormatVersion: 2,
  exportTime: new Date().toISOString(),
  containerVersion: {
    path: "accounts/0/containers/0/versions/0",
    accountId: "0",
    containerId: "0",
    containerVersionId: "0",
    name: "Prestoliv Analytics — full setup",
    description: `Import into ${GTM_ID}. Triggers + GA4 tags for all Prestoliv dataLayer events.`,
    container: {
      path: "accounts/0/containers/0",
      accountId: "0",
      containerId: "0",
      name: "www.prestoliv.com",
      publicId: GTM_ID,
      usageContext: ["WEB"],
      fingerprint: "0",
      tagManagerUrl: "https://tagmanager.google.com/",
      features: { supportUserPermissions: true, supportEnvironments: true, supportWorkspaces: true, supportGtagConfigs: true, supportBuiltInVariables: true, supportClients: false, supportFolders: true, supportTags: true, supportTemplates: true, supportTriggers: true, supportVariables: true, supportVersions: true, supportZones: true, supportTransformations: false },
      tagIds: [GTM_ID],
    },
    tag: tags,
    trigger: triggers.map((t) => t.def),
    variable: variables.map((v) => v.def),
    builtInVariable: [
      { accountId: "0", containerId: "0", type: "PAGE_URL", name: "Page URL" },
      { accountId: "0", containerId: "0", type: "PAGE_HOSTNAME", name: "Page Hostname" },
      { accountId: "0", containerId: "0", type: "PAGE_PATH", name: "Page Path" },
      { accountId: "0", containerId: "0", type: "REFERRER", name: "Referrer" },
      { accountId: "0", containerId: "0", type: "EVENT", name: "Event" },
    ],
    fingerprint: "0",
    tagManagerUrl: "https://tagmanager.google.com/",
  },
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(container, null, 2));
console.log(`Wrote ${OUT}`);
console.log(`  ${variables.length} variables, ${triggers.length} triggers, ${tags.length} tags`);
