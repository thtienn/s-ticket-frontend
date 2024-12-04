// src/controllers/eventController.js
import { createEvent, getAllEvents, getEventById, uploadImage } from "../models/Event";
const baseUrl = import.meta.env.VITE_BASE_URL;
export const fetchAllEvents = async () => {
    return await getAllEvents()
}

export const fetchEventById = async (id) => {
    const response = await fetch(`${baseUrl}/event/${id}`);
    const data = await response.json();
    return data;
}

export const addEvent = async (event) => {
    return await createEvent(event);
}

export const addImage = async (file, id_folder, id_image) => {
    return await uploadImage(file, id_folder, id_image)
}