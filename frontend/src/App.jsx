import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// pages & components
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token ? true : false;
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/add-job"
              element={
                isAuthenticated ? <AddJobPage /> : <Navigate to="/signup" />
              }
            />
            <Route
              path="/job-page/:id"
              element={<JobPage isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/edit-job/:id"
              element={
                isAuthenticated ? <EditJobPage /> : <Navigate to="/signup" />
              }
            />
            <Route
              path="/sign-up"
              element={
                !isAuthenticated ? (
                  <SignUpPage
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/log-in"
              element={
                !isAuthenticated ? (
                  <LoginPage
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
