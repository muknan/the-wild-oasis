import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://rqcuwfarggryqprsknoi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxY3V3ZmFyZ2dyeXFwcnNrbm9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2NzEwNDQsImV4cCI6MjEwNjI0NzA0NH0.78PYWfA2MXIAY3ESGtZ4zzMN5jZXEZS-6a4D6Bg3PLM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
