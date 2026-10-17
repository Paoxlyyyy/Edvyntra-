/**
 * apiService.ts - Centralized client API communication for EDVYNTRA
 * Ensures reliable requests on both Web and Android, with safe JSON parsing,
 * credentials handling, and graceful error messages.
 */

// Determine backend API base URL
export function getApiBaseUrl(): string {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    const origin = window.location.origin;
    const protocol = window.location.protocol;

    if (
      protocol === 'file:' ||
      origin.startsWith('capacitor://') ||
      origin.startsWith('ionic://') ||
      (origin.includes('localhost') && !origin.includes(':3000'))
    ) {
      return 'https://edvyntra-1.onrender.com';
    }
  }

  return '';
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = `${baseUrl}${cleanEndpoint}`;

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (options.body && typeof options.body === 'string' && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  // The public Render API does not use browser session cookies. Sending
  // credentials with Access-Control-Allow-Origin: * causes CORS to fail.
  const fetchOptions: RequestInit = {
    ...options,
    headers,
    credentials: options.credentials || (baseUrl ? 'omit' : 'same-origin'),
  };

  let response: Response;
  try {
    response = await fetch(fullUrl, fetchOptions);
  } catch (networkErr: any) {
    console.error(`Network error requesting ${fullUrl}:`, networkErr);
    throw new Error(`Error de conexión al conectar con ${endpoint}: ${networkErr.message || 'Verifica tu conexión a internet.'}`);
  }

  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('text/html')) {
    const htmlText = await response.text();
    console.warn(`Received HTML response from ${endpoint} (status ${response.status}):`, htmlText.slice(0, 200));

    if (htmlText.includes('__cookie_check') || htmlText.includes('302 Found')) {
      throw new Error('La sesión de conexión requiere actualización de cookies. Por favor recarga la página.');
    }

    throw new Error(`El servidor respondió con página HTML (código ${response.status}) en lugar de datos JSON.`);
  }

  let data: any;
  try {
    data = await response.json();
  } catch (parseErr: any) {
    console.error(`Failed to parse JSON from ${endpoint}:`, parseErr);
    throw new Error(`Respuesta inválida del servidor al procesar ${endpoint}.`);
  }

  if (!response.ok) {
    const errorMsg = data?.error || data?.details || data?.message || `Error del servidor (${response.status})`;
    throw new Error(errorMsg);
  }

  return data as T;
}
