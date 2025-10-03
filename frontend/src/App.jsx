import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// pages & components
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage"
import SignUpPage from "./pages/SignUpPage";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
              <Route path="/add-job" element={<AddJobPage />} />
              <Route
                path="/sign-up"
                element={!isAuthenticated ? (
                  <SignUpPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                ) : (
                  <Navigate to="/" />
                )}
              />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
