// src/backendCalls/events.ts
export async function fetchEvents() {
    const response = await fetch('https://propagation-be.onrender.com/events');
    if (!response.ok) throw new Error('Failed to fetch events');
    return response.json();
  }

  // src/backendCalls/events.ts
export async function fetchEventById(id: string) {
    const response = await fetch(`https://propagation-be.onrender.com/events/${id}`);
    if (!response.ok) throw new Error('Failed to fetch event');
    return response.json();
  }