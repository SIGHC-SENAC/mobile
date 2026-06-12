import { VITE_API_BASE_URL } from "@env";

export function hasApiBaseUrl() {
  return Boolean(VITE_API_BASE_URL);
}

function buildUrl(path, query = {}) {
  const baseUrl = VITE_API_BASE_URL?.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${baseUrl}${normalizedPath}`);

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
}

export async function requestJson(path, options = {}) {
  if (!hasApiBaseUrl()) {
    throw new Error("VITE_API_BASE_URL não configurada.");
  }

  const {
    method = "GET",
    query,
    body,
    headers,
  } = options;

  const response = await fetch(buildUrl(path, query), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function requestFormData(path, formData, options = {}) {
  if (!hasApiBaseUrl()) {
    throw new Error("VITE_API_BASE_URL não configurada.");
  }

  const {
    method = "POST",
    query,
    headers,
  } = options;

  const response = await fetch(buildUrl(path, query), {
    method,
    headers,
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getPayloadArray(payload, keys = []) {
  if (Array.isArray(payload)) {
    return payload;
  }

  for (const key of keys) {
    if (Array.isArray(payload?.[key])) {
      return payload[key];
    }
  }

  return [];
}
