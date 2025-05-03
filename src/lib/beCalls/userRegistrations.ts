

export interface CourseRegistration {
  id: string;
  courseId: string;
  courseName: string;
  courseImage: string;
  progress: number;
  category: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  courseName: string;
}

export interface UserRegistrations {
  courses: CourseRegistration[];
  events: EventRegistration[];
}

export const getUserRegistrations = async (userId: string): Promise<UserRegistrations> => {
  try {
    const response = await fetch(`https://propagation-be.onrender.com/user/${userId}/registrations`);
    if (!response.ok) {
      throw new Error('Failed to fetch user registrations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    return { courses: [], events: [] };
  }
}; 