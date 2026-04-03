const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://test-hbwi.onrender.com';
export const apiCall = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = localStorage.getItem('authToken');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (options.headers && typeof options.headers === 'object' && !Array.isArray(options.headers)) {
    Object.assign(headers, options.headers);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${response.statusText}`);
  }

  return response.json();
};

export const get = (endpoint: string, options?: RequestInit) =>
  apiCall(endpoint, { ...options, method: 'GET' });

export const post = (endpoint: string, data?: any, options?: RequestInit) =>
  apiCall(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });

export const put = (endpoint: string, data?: any, options?: RequestInit) =>
  apiCall(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });

export const patch = (endpoint: string, data?: any, options?: RequestInit) =>
  apiCall(endpoint, {
    ...options,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });

export const delete_ = (endpoint: string, options?: RequestInit) =>
  apiCall(endpoint, { ...options, method: 'DELETE' });
