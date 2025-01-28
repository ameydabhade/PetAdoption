import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";

import PetListingsPage from "./pages/PetListingsPage";
import NotificationsPage from "./pages/NotificationsPage";
import AdoptionFormPage from "./pages/AdoptionFormPage";
import { PetAdoption } from "./pages/PetAdoption";

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/pet-listings"
        element={
          <Layout>
            <PetListingsPage />
          </Layout>
        }
      />
      <Route
        path="/notifications"
        element={
          <Layout>
            <NotificationsPage />
          </Layout>
        }
      />
      <Route
        path="/adoption-form"
        element={
          <Layout>
            <AdoptionFormPage />
          </Layout>
        }
      />
      <Route
        path="/pet/:id"
        element={
          <Layout>
            <PetAdoption />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
