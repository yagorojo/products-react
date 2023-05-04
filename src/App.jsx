import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/common/Header";
import Login from "./pages/Login/Login";
import Footer from "./components/common/Footer";
import Admin from "./pages/Admin/Admin";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
