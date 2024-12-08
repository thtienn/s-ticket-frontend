// src/models/User.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const baseUrl = import.meta.env.VITE_BASE_URL;

export const getAllUsers = async () => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) throw error;
  return data;
};

export const createUser = async (user) => {
  const response = await fetch(`${baseUrl}/user`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    console.error("Error creating user:", response);
    return;
  }
  const result = await response.json();
  return result;
};

export const getUser = async (email) => {
  const response = await fetch(`${baseUrl}/user/validate`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email
    }),
  });
  if (!response.ok) {
    if (response.status === 404) {
        return null 
    } else {
        console.error("Error fetching user data:", response);
        return;
    }
  }
  const userData = await response.json();
  return userData;
}

export const getSession = () => {
  return supabase.auth.getSession()
}

export const updateUser = async (id, user) => {
  const response = await fetch(`${baseUrl}/user/${id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    console.error("Error updating user:", response);
    return;
  }
  const result = await response.json();
  return result;
}