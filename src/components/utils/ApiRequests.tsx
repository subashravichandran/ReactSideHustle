interface ApiResponse<T = any> {
  status?: string; // Optional: Common fields for your API responses
  data?: T;        // The actual response data (generic type)
}

export interface RequestParams {
  method?: string;
  headers?: HeadersInit;
  url_params: string[];
}

export default async function ApiRequest<T=any>(params: RequestParams): Promise<ApiResponse<T> | null> {
  const { method = 'GET', headers = { 'Content-Type': 'application/json' }, url_params} = params;
  const end_point_url = url_params.join('')

  try {
    const response = await fetch(end_point_url, { method, headers });

    if (!response.ok) { throw new Error(`Error: ${response.status} ${response.statusText}`); }
    const data: T = await response.json();
    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}