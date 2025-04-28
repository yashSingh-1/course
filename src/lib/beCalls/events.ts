import prisma from '@/lib/prisma'

// Example of creating an event
export async function createEvent() {
  const event = await prisma.event.create({
    data: {
      title: "Web Development Workshop",
      type: "WORKSHOP",
      startDate: new Date(),
      endDate: new Date(),
      shortDesc: "Learn web development basics",
      location: "Online",
      organizer: "Tech Academy",
      thumbnail: "https://placehold.co/600x400",
      details: {
        create: {
          fullDescription: "Comprehensive web development workshop...",
          requirements: ["Laptop", "Internet Connection"],
          outcomes: ["Basic HTML/CSS", "JavaScript Fundamentals"],
          modules: [],
          guidelines: ["Be on time", "Complete assignments"],
        }
      }
    },
    include: {
      details: true
    }
  })
  return event
}

// Example of fetching events
export async function getEvents() {
  const events = await prisma.event.findMany({
    include: {
      details: true
    }
  })
  return events
}

// Example of updating an event
export async function updateEvent(id: string) {
  const event = await prisma.event.update({
    where: { id },
    data: {
      status: "ONGOING"
    }
  })
  return event
}