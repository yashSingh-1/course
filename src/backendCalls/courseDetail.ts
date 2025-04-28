export async function fetchCourseDetail(id: string) {
  const response = await fetch(`https://propagation-be.onrender.com/courses/${id}`);
  if (!response.ok) throw new Error('Failed to fetch course detail');
  return response.json();
}
