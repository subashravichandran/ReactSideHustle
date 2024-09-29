import { REQUEST_URL, VERSION_ONE } from "../constants/Constant";

interface ApiResponse<T = any> {
  status?: string; // Optional: Common fields for your API responses
  data?: T;        // The actual response data (generic type)
}

export interface RequestParams {
  method?: string;
  headers?: HeadersInit;
  url_params: string[];
  transform?: (data: any) => any
}

export default async function ApiRequest<T=any>(params: RequestParams): Promise<ApiResponse<T> | null> {
  const { method = 'GET', headers = { 'Content-Type': 'application/json' }, url_params, transform } = params;
  url_params.splice(0, 0, REQUEST_URL)
  url_params.splice(1, 0, VERSION_ONE)
  const end_point_url = url_params.join('')

  try {
    const response = await fetch(end_point_url, { method, headers });
    console.log('API Called: ', end_point_url)

    if (!response.ok) { throw new Error(`Error: ${response.status} ${response.statusText}`); }
    const data: any = await response.json();
    const transformedData = transform ? transform(data) : data;
    return { data: transformedData };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}