export interface CourseRegistration {
  _type?: 'course';
  id: string;
  courseId: string;
  courseName: string;
  courseImage: string;
  progress: number;
  category: string;
  description?: string;
}

export interface EventRegistration {
  _type?: 'event';
  id: string;
  title: string;
  shortDesc: string;
  thumbnail: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
  location: string;
  organizer: string;
  price: number | null;
  capacity: number | null;
  createdAt: string;
  updatedAt: string;
  registrationStatus: string;
  registrationDate: string;
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