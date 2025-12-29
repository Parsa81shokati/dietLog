import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function useAuth(redirectTo = "/login") {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ❌ توکنی نداریم → ریدایرکت
    if (!token) {
      setLoading(false);
      if (redirectTo) router.replace(redirectTo);
      return;
    }

    async function fetchUser() {
      try {
        const res = await fetch("/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        // ❌ توکن خراب یا منقضی
        localStorage.removeItem("token");
        setUser(null);
        if (redirectTo) router.replace(redirectTo);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [redirectTo]);

  return { user, loading };
}
