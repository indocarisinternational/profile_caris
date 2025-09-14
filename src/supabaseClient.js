import { createClient } from "@supabase/supabase-js";

// Ambil dari dashboard Supabase (Project Settings → API)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
