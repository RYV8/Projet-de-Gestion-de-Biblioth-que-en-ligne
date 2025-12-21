// hooks/uselivres.js
import { useState, useEffect } from "react";

export function useLivres(filters = {}, sort = "") {
  const [livres, setLivres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams();

    // Ajout des filtres au query string
    Object.entries(filters).forEach(([key, val]) => {
      if (val) query.append(key, val);
    });

    // Ajout tri
    if (sort) query.append("ordering", sort);

    setLoading(true);
    setError(null);

    fetch(`http://localhost:8000/api/livres/list/?${query.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setLivres(data.results || data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [filters, sort]);

  return { livres, loading, error };
}
