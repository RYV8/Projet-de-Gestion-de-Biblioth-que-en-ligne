// utils/apiFetch.js
import { useEffect, useState } from "react";
import { getCookie } from "../utils/csrf/";

const API_URL = "http://localhost:8000/api/";

export async function apiFetch(
  endpoint,
  { method = "GET", body = null, headers = {} } = {}
) {
  // Préparer headers avec CSRF si nécessaire
  const opts = {
    method,
    credentials: "include",
    headers: {
      ...headers,
    },
  };
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase())) {
    opts.headers["X-CSRFToken"] = getCookie("csrftoken");
    opts.headers["Content-Type"] = "application/json";

    if (body) opts.body = JSON.stringify(body);
  }
  try {
    const res = await fetch(`${API_URL}${endpoint}`, opts);
    const contentType = res.headers.get("content-type");
    let data = null;

    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      throw { status: res.status, data };
    }

    return data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
}

export function useFetchData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch(url, { signal: controller.signal })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Erreur de reseau");
        }
        return resp.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        if (err.name !== "AbortError") setError(err);
      })
      .finally(setLoading(false));
  }, [url]);
  return {
    data,
    loading,
    error,
  };
}
