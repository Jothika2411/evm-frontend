import React, { useState } from "react";
import store from "./store";
import { Provider } from "react-redux";
import AppRoute from "./routes/route";

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  return (
   <Provider store={store}>
    <AppRoute isLoggedIn={isLoggedIn} onLogin={handleLogin}/>
   </Provider>
  );
};

export default App;
