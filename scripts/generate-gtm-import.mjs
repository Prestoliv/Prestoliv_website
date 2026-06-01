/**
 * Generates gtm/prestoliv-analytics-import.json — import via
 * GTM → Admin → Import Container → Merge (prefer) or Overwrite.
 *
 * One named GA4 tag + trigger per button/action (ctruth-style visibility).
 *
 * Usage: node scripts/generate-gtm-import.mjs
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildNamedTagCatalog } from "./gtm-named-tags-catalog.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../gtm/prestoliv-analytics-import.json");
const TAG_CATALOG_MD = join(__dirname, "../gtm/TAG_CATALOG.md");

const GTM_ID = "GTM-W5G7H4GP";
const GA4_ID = "G-Z21L9R9W4V";
const ALL_PAGES = "2147479553";

const BASE_DLV_KEYS = [
  "page_path",
  "page_title",
  "page_location",
  "content_group",
  "event_category",
  "event_action",
  "event_label",
  "button_id",
  "lead_source",
  "service_type",
  "city",
  "has_email",
  "scroll_percent",
  "cta_id",
  "cta_text",
  "cta_location",
  "cta_destination",
  "link_text",
  "link_destination",
  "nav_location",
  "package_id",
  "package_label",
  "estimate_inr",
  "area_value",
  "area_unit",
  "built_up_sqft",
  "faq_index",
  "faq_question",
  "social_platform",
  "social_location",
  "contact_type",
  "contact_location",
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

function customEventTrigger(triggerName, eventName, filters = []) {
  const triggerId = nextId();
  const extraFilters = filters.map(({ key, value }) => ({
    type: "EQUALS",
    parameter: [
      { type: "TEMPLATE", key: "arg0", value: `{{DLV - ${key}}}` },
      { type: "TEMPLATE", key: "arg1", value: value },
    ],
  }));

  return {
    id: triggerId,
    def: {
      accountId: "0",
      containerId: "0",
      triggerId,
      name: triggerName,
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
      ...(extraFilters.length > 0 ? { filter: extraFilters } : {}),
      fingerprint: "1",
    },
  };
}

function eventParams(keys) {
  const unique = [...new Set(keys)];
  return {
    type: "LIST",
    key: "eventSettingsTable",
    list: unique.map((key) => ({
      type: "MAP",
      map: [
        { type: "TEMPLATE", key: "parameter", value: key },
        { type: "TEMPLATE", key: "parameterValue", value: `{{DLV - ${key}}}` },
      ],
    })),
  };
}

function ga4EventTagDef(tagName, ga4EventName, triggerId, paramKeys) {
  const tagId = nextId();
  const params = [...paramKeys];
  if (!params.includes("button_id")) {
    params.push("button_id");
  }
  return {
    accountId: "0",
    containerId: "0",
    tagId,
    name: tagName,
    type: "gaawe",
    parameter: [
      { type: "BOOLEAN", key: "sendEcommerceData", value: "false" },
      { type: "TEMPLATE", key: "eventName", value: ga4EventName },
      { type: "TEMPLATE", key: "measurementIdOverride", value: GA4_ID },
      eventParams(params),
    ],
    fingerprint: "1",
    firingTriggerId: [triggerId],
    tagFiringOption: "ONCE_PER_EVENT",
    monitoringMetadata: { type: "MAP" },
    consentSettings: { consentStatus: "NOT_SET" },
  };
}

const namedCatalog = buildNamedTagCatalog();

const paramKeysUsed = new Set(BASE_DLV_KEYS);
for (const entry of namedCatalog) {
  for (const key of entry.params) paramKeysUsed.add(key);
}

const variables = [...paramKeysUsed].map((key) => dlv(`DLV - ${key}`, key));

const triggers = [];
const tags = [];

const ga4ConfigTagId = nextId();
tags.push({
  accountId: "0",
  containerId: "0",
  tagId: ga4ConfigTagId,
  name: "GA4 | Configuration",
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
});

for (const entry of namedCatalog) {
  const trigger = customEventTrigger(entry.triggerName, entry.event, entry.filters);
  triggers.push(trigger);
  tags.push(ga4EventTagDef(entry.tagName, entry.ga4Event, trigger.id, entry.params));
}

const mdLines = [
  "# Prestoliv GTM tag catalog (named tags)",
  "",
  `Generated: ${new Date().toISOString().slice(0, 10)}`,
  "",
  `Container: **${GTM_ID}** · GA4: **${GA4_ID}**`,
  "",
  `**${namedCatalog.length}** GA4 event tags (one per button/action) + 1 configuration tag.`,
  "",
  "Import: `gtm/prestoliv-analytics-import.json` → GTM Admin → Import Container → Merge → Publish.",
  "",
  "| GTM tag name | Trigger | dataLayer event | GA4 event | Filters |",
  "|--------------|---------|-----------------|-----------|---------|",
];

const mdCell = (s) => s.replace(/\|/g, " · ");

for (const entry of namedCatalog) {
  const filterStr = entry.filters.length
    ? entry.filters.map((f) => `${f.key}=${f.value}`).join(", ")
    : "—";
  mdLines.push(
    `| ${mdCell(entry.tagName)} | ${mdCell(entry.triggerName)} | \`${entry.event}\` | \`${entry.ga4Event}\` | ${filterStr} |`,
  );
}

const container = {
  exportFormatVersion: 2,
  exportTime: new Date().toISOString(),
  containerVersion: {
    path: "accounts/0/containers/0/versions/0",
    accountId: "0",
    containerId: "0",
    containerVersionId: "0",
    name: "Prestoliv Analytics — named tags (full)",
    description: `Import into ${GTM_ID}. One GA4 tag per CTA/action; matches ctruth-style GTM UI.`,
    container: {
      path: "accounts/0/containers/0",
      accountId: "0",
      containerId: "0",
      name: "www.prestoliv.com",
      publicId: GTM_ID,
      usageContext: ["WEB"],
      fingerprint: "0",
      tagManagerUrl: "https://tagmanager.google.com/",
      features: {
        supportUserPermissions: true,
        supportEnvironments: true,
        supportWorkspaces: true,
        supportGtagConfigs: true,
        supportBuiltInVariables: true,
        supportClients: false,
        supportFolders: true,
        supportTags: true,
        supportTemplates: true,
        supportTriggers: true,
        supportVariables: true,
        supportVersions: true,
        supportZones: true,
        supportTransformations: false,
      },
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
writeFileSync(TAG_CATALOG_MD, `${mdLines.join("\n")}\n`);

console.log(`Wrote ${OUT}`);
console.log(`Wrote ${TAG_CATALOG_MD}`);
console.log(`  ${variables.length} variables, ${triggers.length} triggers, ${tags.length} tags`);
