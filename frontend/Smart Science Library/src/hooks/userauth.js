// hooks/userauth.js
import { useState, useEffect } from "react";

import { apiFetch } from "../hooks/fetch/";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const fetchUser = async () => {
    try {
      const data = await apiFetch("/accounts/user/");
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    await getCsrf();
    try {
      await apiFetch("/accounts/login/", {
        method: "POST",
        body: { login: email, password },
      });
      await fetchUser();
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await getCsrf();
    await apiFetch("/accounts/logout/", { method: "POST" });
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, login, logout, fetchUser };
}
