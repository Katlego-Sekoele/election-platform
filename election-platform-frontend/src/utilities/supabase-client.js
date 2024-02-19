import { createContext } from "react";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY;

export const SupabaseSessionContext = createContext(null);
const supabaseClient = createBrowserClient(supabaseUrl, supabaseKey);

export default supabaseClient;
