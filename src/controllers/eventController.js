// src/controllers/eventController.js
import { getAllEvents, getEventById } from "../models/Event";

export const fetchAllEvents = async () => {
    return await getAllEvents()
}

export const fetchEventById = async (id) => {
    return await getEventById(id)
}