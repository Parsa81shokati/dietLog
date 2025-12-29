import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function useAuth(redirectTo = "/") {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setUser(null);
        if (redirectTo) router.push(redirectTo);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [redirectTo]);

  return { user, loading };
}
