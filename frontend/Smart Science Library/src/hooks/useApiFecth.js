// hooks/useApiFetch.js
import { useState, useEffect } from "react";
import { apiFetch } from "../hooks/fetch"; // ton apiFetch actuel

export function useApiFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        const result = await apiFetch(url, options);
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) setError(err.message || "Erreur inconnue");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => { isMounted = false; };
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
}
