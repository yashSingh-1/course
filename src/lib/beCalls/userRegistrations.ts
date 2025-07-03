import { useAuth } from '../auth';

const API_BASE_URL = 'https://propagation-be.onrender.com/api';

export interface CourseRegistration {
  _type?: 'course';
  id: string;
  courseId: string;
  courseName: string;
  courseImage: string;
  progress: number;
  category: string;
  description?: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  completed: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  course: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    level: string;
    duration: number;
    price: number;
  };
}

export interface EventRegistration {
  _type?: 'event';
  id: string;
  eventId: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  age?: string;
  occupation?: string;
  organization?: string;
  interestReason?: string;
  otherReason?: string;
  experience?: string;
  expectations?: string;
  questions?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  event: {
    id: string;
    title: string;
    shortDesc: string;
    thumbnail: string;
    location: string;
    startDate: string;
    endDate: string;
    status: string;
  };
}

export interface UserRegistrations {
  courses: CourseRegistration[];
  events: EventRegistration[];
}

export const getUserRegistrations = async (userId: string): Promise<UserRegistrations | null> => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/user/registrations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch registrations');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching user registrations:', error);
    return null;
  }
}; 