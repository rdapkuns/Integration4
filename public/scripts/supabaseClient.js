import { createClient } from '@supabase/supabase-js'

// Replace with your actual values from Supabase > Settings > API
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabaseUrl = "https://qhfzxdchxbpkaqneavte.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZnp4ZGNoeGJwa2FxbmVhdnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MzM3MjksImV4cCI6MjA2NTIwOTcyOX0.skkK5t2d-xyG2TzTguXfH22sVg2rBx8iQTttBsAQ888"

export const supabase = createClient(supabaseUrl, supabaseKey)
