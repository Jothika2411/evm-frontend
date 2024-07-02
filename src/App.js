import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import AppRoute from "./routes/route";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    setUser(storedUser ? JSON.parse(storedUser) : null);
    setIsLoggedIn(storedIsLoggedIn);
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
  };
  if (loading) return <div>Loading...</div>;

  return (
    <Provider store={store}>
      <AppRoute isLoggedIn={isLoggedIn} onLogin={handleLogin} />
    </Provider>
  );
};

export default App;
