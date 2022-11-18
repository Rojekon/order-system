import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import NewOrder from "./components/NewOrder";
import OrderData from "./components/OrderData";
import Notfound from "./components/Notfound";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      {currentUser === null && (
        <Login
          onChangeLogin={(currentUser) => {
            setCurrentUser(currentUser);
          }}
        />
      )}
      {currentUser !== null && (
        <Routes>
          <Route path="/" element={<Navbar currentUser={currentUser} />}>
            <Route
              index
              path="/"
              element={<OrderData currentUser={currentUser} />}
            />
            <Route
              path="neworder"
              element={<NewOrder currentUser={currentUser} />}
            />
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
