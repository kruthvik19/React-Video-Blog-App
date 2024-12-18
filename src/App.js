import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Container/Home";
import Login from "./Container/Login";
import { fetchUser, userAccessToken } from "./utils/fetchUser";

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndSetUser = () => {
      const accessToken = userAccessToken();
      if (!accessToken) {
        navigate("/login", { replace: true });
      } else {
        const [userInfo] = fetchUser();
        setUser(userInfo);
      }
    };

    fetchAndSetUser();
  }, [navigate]); // Add 'navigate' as a dependency to resolve the warning

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home user={user} />} />
    </Routes>
  );
};

export default App;
