
import { useState } from "react";
import { useNavigate } from "react-router";

import { auth } from "../firebase";

export function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  auth.onAuthStateChanged((user) => {
    if (!user) {
      navigate("/login");
    } else {
      setIsLoading(false);
    }
  });

  if (isLoading) {
    return (
      <div
        fluid
        className="d-grid justify-content-center align-items-center vh-100"
      >
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
      </div>
    );
  }

  return children;
}