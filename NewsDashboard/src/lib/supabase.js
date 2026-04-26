import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dcoetyabmrpmfrzntryu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjb2V0eWFibXJwbWZyem50cnl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxODYwNTcsImV4cCI6MjA5Mjc2MjA1N30.SPlGS9TDDRNRJmxdn7H34yaaEdKZW_E6aX7Rpn-jwvE";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);