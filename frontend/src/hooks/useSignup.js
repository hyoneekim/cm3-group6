import { useState } from "react";

export default function useSignup(setIsAuthenticated) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (object) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(object),
      });

      // parse JSON safely
      let user;
      try {
        user = await response.json();
      } catch (e) {
        setError('Invalid server response');
        setIsLoading(false);
        return false;
      }
      if (!response.ok) {
        console.log(user.error);
        setError(user.error || 'Signup failed');
        setIsLoading(false);
        return false;
      }
      sessionStorage.setItem("user", JSON.stringify(user));
      if (typeof setIsAuthenticated === 'function') {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.message || 'Network error');
      setIsLoading(false);
      return false;
    }
  };

  return { handleSignup, isLoading, error };
}