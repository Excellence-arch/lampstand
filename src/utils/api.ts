// src/utils/api.ts

const BASE_URL = process.env.BASE_URL || 'https://yourapiurl.com'; // Update this to your actual base URL

type RequestOptions = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
  authToken?: string;
};

export const apiFetch = async (
  endpoint: string,
  options: RequestOptions = {}
): Promise<any> => {
  const { headers = {}, authToken, ...restOptions } = options;

  // Create a combined headers object with auth if token is provided
  const combinedHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: combinedHeaders,
    ...restOptions,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  return response.json();
};
