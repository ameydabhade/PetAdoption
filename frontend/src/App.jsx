import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import PetCard from "./components/PetCard";

const PetListingsPage = () => {
  return (
    <div>
      <PetCard />
    </div>
  );
};

const AdoptionFormPage = () => {
  return (
    <div>
      <h1>Adoption Form</h1>
    </div>
  );
};

const NotificationsPage = () => {
  return (
    <div>
      <h1>Notifications</h1>
    </div>
  );
};

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
    </Routes>
  );
}

export default App;
