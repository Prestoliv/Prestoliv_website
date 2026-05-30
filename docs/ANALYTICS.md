# Prestoliv analytics reference

Third-party scripts load when any of `VITE_GTM_ID`, `VITE_GA_MEASUREMENT_ID`, `VITE_META_PIXEL_ID`, or `VITE_CLARITY_PROJECT_ID` is set.

Implementation: `src/lib/analytics/` · Route wrapper: `src/components/AnalyticsProvider.tsx`

## Platforms

| Platform | Env variable | Role |
|----------|--------------|------|
| Google Tag Manager | `VITE_GTM_ID` | Central tag container; trigger on `dataLayer` events below |
| Google Analytics 4 | `VITE_GA_MEASUREMENT_ID` | Direct `gtag` (optional if GA4 is in GTM) |
| Meta Pixel | `VITE_META_PIXEL_ID` | Ads + conversion API companion |
| Microsoft Clarity | `VITE_CLARITY_PROJECT_ID` | Session recordings & heatmaps |

## GTM setup

Create **Custom Event** triggers using the **Event name** column exactly as written. Map to GA4 Event tags or use built-in GA4 configuration.

Every event also includes: `page_path`, `content_group`, `event_category`, `event_action`, `event_label`.

## Event catalog

### Page & engagement

| Event name | Category | When it fires | GA4 | Meta |
|------------|----------|---------------|-----|------|
| `virtual_page_view` | page | SPA route change | `page_view` | PageView |
| `scroll_depth` | engagement | 25 / 50 / 75 / 100% scroll | — | ScrollDepth (custom) |
| `faq_expand` | engagement | FAQ accordion opened | — | FaqExpand (custom) |
| `cta_click` | engagement | Secondary CTA (e.g. Calculate Cost) | — | CtaClick (custom) |
| `view_service_interest` | engagement | Service page viewed | `view_item` | — |

### Navigation

| Event name | Category | When it fires |
|------------|----------|---------------|
| `navigation_click` | navigation | Internal link (nav, footer) |

### Consultation funnel (conversion)

| Event name | Category | When it fires | GA4 | Meta |
|------------|----------|---------------|-----|------|
| `consultation_modal_open` | conversion | Dialog opened | — | InitiateCheckout |
| `consultation_modal_close` | conversion | Dialog closed without submit | — | — |
| `consultation_form_start` | conversion | First field interaction | — | — |
| `consultation_form_submit` | conversion | Lead saved successfully | `generate_lead` | Lead |
| `consultation_form_error` | conversion | Submit failed | — | — |

**`lead_source` values:** `hero`, `navbar_desktop`, `navbar_mobile`, `navbar_services_menu`, `footer_cta`, `calculator_sidebar`, `calculator_empty_state`, `calculator_page_hero`, `service_residential`, `service_commercial`, `service_interiors`

### Calculator

| Event name | Category | When it fires | GA4 | Meta |
|------------|----------|---------------|-----|------|
| `calculator_started` | calculator | Packages loaded | `view_item` | ViewContent |
| `calculator_area_updated` | calculator | Area/unit changed (debounced) | — | CalculatorEngagement (custom) |
| `calculator_unit_changed` | calculator | Sq ft ↔ Sq m toggle | — | — |
| `calculator_package_selected` | calculator | Package card selected | `select_item` | ViewContent |
| `calculator_estimate_viewed` | calculator | Estimate displayed (debounced) | — | — |
| `calculator_reset` | calculator | Reset to defaults | — | — |

### Authentication

| Event name | Category | When it fires | GA4 | Meta |
|------------|----------|---------------|-----|------|
| `sign_in_start` | authentication | Google login clicked | `login` | SignInStart (custom) |
| `sign_in_complete` | authentication | OAuth callback success | `login` | SignInComplete (custom) |
| `dashboard_open` | authentication | View Dashboard clicked | — | — |

### Contact & social

| Event name | Category | When it fires | Meta |
|------------|----------|---------------|------|
| `contact_click` | contact | Phone or email in footer | Contact |
| `social_click` | social | Instagram / LinkedIn / Facebook | SocialClick (custom) |

## Content groups (GA4 `content_group`)

| Route | Group |
|-------|--------|
| `/` | home |
| `/process` | process |
| `/about` | about |
| `/calculator` | calculator |
| `/services` | services_hub |
| `/services/residential` | service_residential |
| `/services/commercial` | service_commercial |
| `/services/interiors` | service_interiors |

## Recommended Meta custom conversions

1. **Lead** ← `consultation_form_submit`
2. **InitiateCheckout** ← `consultation_modal_open`
3. **ViewContent** ← `calculator_package_selected` or `calculator_started`

## Code export

The machine-readable catalog lives in `src/lib/analytics/events.ts` as `ANALYTICS_EVENT_CATALOG`.
