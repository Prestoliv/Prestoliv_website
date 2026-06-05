-- Contact / WhatsApp numbers (read by the marketing site via app_settings).
-- Run in Supabase SQL Editor, or merge into your migrations.
--
-- Update anytime:
--   Table: app_settings
--   Row key: contact_settings
--   value JSON fields:
--     whatsapp_number  — digits only with country code (e.g. 919849078569)
--     phone_e164       — tel: link (e.g. +919849078569)
--     phone_display    — label shown in footer (e.g. +91 98490 78569)
--     whatsapp_enabled — false hides the sticky WhatsApp button

insert into app_settings (key, value)
values (
  'contact_settings',
  jsonb_build_object(
    'whatsapp_number', '919849078569',
    'phone_e164', '+919849078569',
    'phone_display', '+91 98490 78569',
    'whatsapp_enabled', true
  )
)
on conflict (key) do update
set value = excluded.value;
