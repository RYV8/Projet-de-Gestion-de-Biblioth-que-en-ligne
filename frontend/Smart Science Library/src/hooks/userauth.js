// hooks/userauth.js
import { useState, useEffect } from "react";
import { apiFetch } from "../hooks/fetch.jsx";

/**
 * Auth hook backed by dj_rest_auth endpoints.
 *
 * Uses cookie-based session auth with CSRF handled by apiFetch.
 */
export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      // dj_rest_auth user details endpoint
      const data = await apiFetch("auth/user/");
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      await apiFetch("auth/login/", {
        method: "POST",
        body: { email, password },
      });
      await fetchUser();
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiFetch("auth/logout/", { method: "POST" });
    } finally {
      setUser(null);
    }
  };

  const register = async (payload) => {
    try {
      const data = await apiFetch("auth/registration/", {
        method: "POST",
        body: payload,
      });
      return { ok: true, data };
    } catch (err) {
      return { ok: false, error: err };
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, login, logout, register, fetchUser };
}
