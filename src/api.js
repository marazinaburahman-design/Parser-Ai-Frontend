const API_URL = import.meta.env.VITE_API_URL || '';

/**
 * Send the resume PDF + job description to the backend for analysis.
 * @param {FormData} formData
 */
export async function analyzeResume(formData) {
  let response;
  try {
    response = await fetch(`${API_URL}/api/resume/analyze`, {
      method: 'POST',
      body: formData,
    });
  } catch {
    throw new Error(
      'Could not reach the API. Is the backend server running on port 5000?'
    );
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong while analyzing.');
  }
  return data;
}
