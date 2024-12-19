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

export const getEventById = async (id) => {
    const { data, error } = await supabase.from("events").select().eq("id", id).single()
    if (error) throw error
    return data
}

export const createEvent = async (event) => {
    try {
        const response = await fetch('http://localhost:3000/event', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        });
    
        if (!response.ok) {
          throw new Error(`Failed to create event: ${response.statusText}`);
        }
    
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
}

export const uploadImage = async (file, id_folder, id_image) => {
    const { data, error } = await supabase.storage
      .from("test")
      .upload(id_folder + "/" + id_image, file);
    if (error) throw error;
    return data;
}