-- ============================================================
-- Admin Panel Schema Migration
-- Indo Caris International — profile_caris
-- ============================================================

-- 1. site_content: key-value store for all editable page content
CREATE TABLE IF NOT EXISTS site_content (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section     text NOT NULL,       -- 'home', 'services', 'pricing', 'about', 'contact'
  key         text NOT NULL,       -- e.g. 'hero_title', 'hero_subtitle'
  value       text,                -- the actual content string
  updated_at  timestamptz DEFAULT now(),
  UNIQUE(section, key)
);

-- 2. pageviews: visitor tracking for custom analytics
CREATE TABLE IF NOT EXISTS pageviews (
  id          bigserial PRIMARY KEY,
  session_id  uuid NOT NULL,
  path        text NOT NULL,
  referrer    text,
  country     text,
  device      text,                -- 'desktop' | 'mobile' | 'tablet'
  browser     text,
  os          text,
  created_at  timestamptz DEFAULT now()
);

-- ============================================================
-- INDEXES for analytics query performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_pageviews_path ON pageviews(path);
CREATE INDEX IF NOT EXISTS idx_pageviews_created_at ON pageviews(created_at);
CREATE INDEX IF NOT EXISTS idx_pageviews_session_id ON pageviews(session_id);
CREATE INDEX IF NOT EXISTS idx_site_content_section ON site_content(section);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Enable RLS on site_content
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public can read site_content (for public site rendering)
CREATE POLICY "site_content_public_read" ON site_content
  FOR SELECT USING (true);

-- Only authenticated users can insert/update/delete site_content
CREATE POLICY "site_content_admin_insert" ON site_content
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "site_content_admin_update" ON site_content
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "site_content_admin_delete" ON site_content
  FOR DELETE USING (auth.role() = 'authenticated');

-- Enable RLS on pageviews
ALTER TABLE pageviews ENABLE ROW LEVEL SECURITY;

-- Anyone can insert pageviews (tracker writes from anon visitors)
CREATE POLICY "pageviews_public_insert" ON pageviews
  FOR INSERT WITH CHECK (true);

-- Only authenticated admin can read pageviews
CREATE POLICY "pageviews_admin_read" ON pageviews
  FOR SELECT USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA: Initial site_content with current hardcoded values
-- ============================================================
INSERT INTO site_content (section, key, value) VALUES
  -- Home section
  ('home', 'badge_text', 'Transforming Ideas into Digital Reality'),
  ('home', 'hero_title', 'Consulting. Engineering. Innovation.'),
  ('home', 'hero_subtitle', 'We provide expert IT consulting and high-end software development to help modern businesses scale in the digital age.'),
  ('home', 'cta_primary', 'Start Your Project'),
  ('home', 'cta_secondary', 'Our Services'),
  ('home', 'feature_1', 'Fast Delivery'),
  ('home', 'feature_2', 'Secure by Design'),
  ('home', 'feature_3', 'Premium Quality'),

  -- Services section
  ('services', 'page_label', 'Our Expertise'),
  ('services', 'page_title', 'Solutions for the Digital Frontier.'),
  ('services', 'page_subtitle', 'We don''t just build software; we engineer competitive advantages. Explore our comprehensive suite of IT services designed to scale your business.'),
  ('services', 'service_1_title', 'Custom Software Development'),
  ('services', 'service_1_desc', 'Tailored web and mobile applications built with modern frameworks like React, Next.js, and Node.js.'),
  ('services', 'service_1_icon', 'solar:code-square-bold'),
  ('services', 'service_2_title', 'IT Consulting & Strategy'),
  ('services', 'service_2_desc', 'Strategic technology roadmaps to align your IT infrastructure with your business goals.'),
  ('services', 'service_2_icon', 'solar:chart-2-bold'),
  ('services', 'service_3_title', 'Digital Transformation'),
  ('services', 'service_3_desc', 'Modernize legacy systems and workflows to improve efficiency and customer experience.'),
  ('services', 'service_3_icon', 'solar:refresh-circle-bold'),
  ('services', 'service_4_title', 'Cloud Infrastructure'),
  ('services', 'service_4_desc', 'Scalable cloud solutions using AWS, Azure, or GCP for maximum uptime and security.'),
  ('services', 'service_4_icon', 'solar:cloud-bold'),
  ('services', 'service_5_title', 'Cybersecurity Solutions'),
  ('services', 'service_5_desc', 'Protect your digital assets with advanced security audits and implementation.'),
  ('services', 'service_5_icon', 'solar:shield-keyhole-bold'),
  ('services', 'service_6_title', 'Managed IT Services'),
  ('services', 'service_6_desc', 'Ongoing support and maintenance to ensure your systems run smoothly 24/7.'),
  ('services', 'service_6_icon', 'solar:settings-bold'),

  -- Pricing section
  ('pricing', 'title', 'Transparent Pricing.'),
  ('pricing', 'subtitle', 'Flexible packages tailored to your business stage and requirements.'),
  ('pricing', 'starter_name', 'Starter'),
  ('pricing', 'starter_price', 'Rp 15jt'),
  ('pricing', 'starter_desc', 'Cocok untuk startup dan MVP bisnis kecil.'),
  ('pricing', 'starter_features', 'Single Platform (Web)|Standard UI/UX Design|Core Functionality|3 Bulan Support'),
  ('pricing', 'professional_name', 'Professional'),
  ('pricing', 'professional_price', 'Rp 45jt'),
  ('pricing', 'professional_desc', 'Ideal untuk perusahaan yang sedang berkembang.'),
  ('pricing', 'professional_features', 'Cross-platform (Web/Mobile)|Premium Custom Design|Advanced Analytics|Dedicated Project Manager|6 Bulan Support'),
  ('pricing', 'enterprise_name', 'Enterprise'),
  ('pricing', 'enterprise_price', 'Custom'),
  ('pricing', 'enterprise_desc', 'Sistem kompleks untuk organisasi skala besar.'),
  ('pricing', 'enterprise_features', 'Multi-platform Ecosystem|High-level Security Audit|AI Integration|Legacy System Migration|24/7 Priority Support'),

  -- About section
  ('about', 'page_title', 'Who We Are.'),
  ('about', 'page_description', 'Indo Caris International is a technology-first consulting firm. We bridge the gap between complex engineering and business impact, helping organizations navigate the digital future with confidence.'),
  ('about', 'mission_title', 'Our Mission'),
  ('about', 'mission_text', 'To empower businesses through cutting-edge technology, delivering scalable and innovative digital solutions that drive sustainable growth.'),
  ('about', 'vision_title', 'Our Vision'),
  ('about', 'vision_text', 'To be the most trusted global partner for digital transformation, recognized for our engineering excellence and strategic insight.'),
  ('about', 'value_1_title', 'Innovation'),
  ('about', 'value_1_text', 'We constantly push boundaries to find better ways.'),
  ('about', 'value_2_title', 'Excellence'),
  ('about', 'value_2_text', 'We strive for perfection in every line of code.'),
  ('about', 'value_3_title', 'Integrity'),
  ('about', 'value_3_text', 'We build trust through transparency and honesty.'),
  ('about', 'value_4_title', 'Collaboration'),
  ('about', 'value_4_text', 'We work as an extension of your own team.'),

  -- Contact section
  ('contact', 'page_title', 'Let''s Start a Conversation.'),
  ('contact', 'page_subtitle', 'Whether you have a specific project in mind or just want to explore how we can help your business grow, we''re here to listen.'),
  ('contact', 'phone', '+62 8139 3139 307'),
  ('contact', 'email', 'admin@carisinternational.com'),
  ('contact', 'location', 'Jakarta, Indonesia')
ON CONFLICT (section, key) DO NOTHING;

-- ============================================================
-- RPC: Analytics Summary Function
-- ============================================================
CREATE OR REPLACE FUNCTION get_analytics_summary(start_date timestamptz, end_date timestamptz)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'total_pageviews', (SELECT COUNT(*) FROM pageviews WHERE created_at BETWEEN start_date AND end_date),
    'unique_visitors', (SELECT COUNT(DISTINCT session_id) FROM pageviews WHERE created_at BETWEEN start_date AND end_date),
    'bounce_rate', (
      SELECT ROUND(
        COALESCE(
          (COUNT(DISTINCT session_id) FILTER (WHERE session_count = 1)::numeric /
           NULLIF(COUNT(DISTINCT session_id), 0)::numeric) * 100
        , 0), 1
      )
      FROM (
        SELECT session_id, COUNT(*) as session_count
        FROM pageviews
        WHERE created_at BETWEEN start_date AND end_date
        GROUP BY session_id
      ) sessions
    ),
    'top_pages', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (
        SELECT path, COUNT(*) as views, COUNT(DISTINCT session_id) as visitors
        FROM pageviews
        WHERE created_at BETWEEN start_date AND end_date
        GROUP BY path
        ORDER BY views DESC
        LIMIT 10
      ) t
    ),
    'countries', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (
        SELECT COALESCE(country, 'Unknown') as country, COUNT(DISTINCT session_id) as visitors
        FROM pageviews
        WHERE created_at BETWEEN start_date AND end_date
        GROUP BY country
        ORDER BY visitors DESC
        LIMIT 10
      ) t
    ),
    'devices', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (
        SELECT COALESCE(device, 'Unknown') as device, COUNT(DISTINCT session_id) as visitors
        FROM pageviews
        WHERE created_at BETWEEN start_date AND end_date
        GROUP BY device
        ORDER BY visitors DESC
      ) t
    ),
    'browsers', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (
        SELECT COALESCE(browser, 'Unknown') as browser, COUNT(DISTINCT session_id) as visitors
        FROM pageviews
        WHERE created_at BETWEEN start_date AND end_date
        GROUP BY browser
        ORDER BY visitors DESC
        LIMIT 10
      ) t
    ),
    'operating_systems', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (
        SELECT COALESCE(os, 'Unknown') as os, COUNT(DISTINCT session_id) as visitors
        FROM pageviews
        WHERE created_at BETWEEN start_date AND end_date
        GROUP BY os
        ORDER BY visitors DESC
        LIMIT 10
      ) t
    ),
    'referrers', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (
        SELECT COALESCE(NULLIF(referrer, ''), 'Direct') as referrer, COUNT(DISTINCT session_id) as visitors
        FROM pageviews
        WHERE created_at BETWEEN start_date AND end_date
        GROUP BY referrer
        ORDER BY visitors DESC
        LIMIT 10
      ) t
    ),
    'daily_views', (
      SELECT COALESCE(json_agg(row_to_json(t)), '[]'::json)
      FROM (
        SELECT DATE(created_at) as date, COUNT(*) as views, COUNT(DISTINCT session_id) as visitors
        FROM pageviews
        WHERE created_at BETWEEN start_date AND end_date
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      ) t
    )
  ) INTO result;

  RETURN result;
END;
$$;
