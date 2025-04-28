export async function fetchCourses() {
  const response = await fetch('https://propagation-be.onrender.com/courses');
  console.log("response from be", response);
  if (!response.ok) throw new Error('Failed to fetch courses');
  return response.json();
} 