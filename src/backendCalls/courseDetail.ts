export async function fetchCourseDetail(id: string) {
  const response = await fetch(`http://localhost:3000/courses/${id}`);
  if (!response.ok) throw new Error('Failed to fetch course detail');
  return response.json();
}
