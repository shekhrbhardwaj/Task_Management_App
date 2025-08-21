import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PublicWrapper = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default PublicWrapper;