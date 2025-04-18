import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protector({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const status = useSelector((state) => state.status);
  useEffect(() => {
    // here is a big exercise.
    if (authentication && status !== authentication) {
      navigate("/login");
    } else if (!authentication && status !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authentication, navigate, status]);
  return loader ? <div>Loading...</div> : <>{children}</>;
}
