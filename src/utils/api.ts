const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
//  || 'https://yourapiurl.com'; // Replace with your actual base URL

type RequestOptions = Omit<RequestInit, 'headers'> & {
  headers?: Record<string, string>;
  authToken?: string;
};

export const apiFetch = async <T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { headers = {}, authToken, ...restOptions } = options;

  // Combined headers with authorization if token is provided
  const combinedHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...headers,
  };

  try {
    // console.log(BASE_URL);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: combinedHeaders,
      ...restOptions,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error(`Error in apiFetch: ${error}`);
    throw new Error(
      error instanceof Error ? error.message : 'Unexpected error occurred'
    );
  }
};
