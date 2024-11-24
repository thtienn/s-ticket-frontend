// src/models/Event.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const getAllEvents = async () => {
    const { data, error } = await supabase.from("events").select("*")
    if (error) throw error
    return data
}

export const getEventById = async (event_id) => {
    const { data, error } = await supabase.from("events").select().eq("event_id", event_id)
    if (error) throw error
    return data
}