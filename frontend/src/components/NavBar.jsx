import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-black shadow-xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 hover:scale-105 transition-transform duration-300">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={
                  "https://media.istockphoto.com/id/837572972/photo/lost-and-homeless-abandoned-dog.jpg?s=612x612&w=0&k=20&c=eN1O0_oSgK1K15LEofqxQJAVDJPNne4QsiaxKg3RIOI="
                }
                alt="PetAdoption Logo"
                className="h-14 w-14 rounded-full border-2 border-white shadow-md"
              />
              <span className="text-white font-bold text-xl">PetAdoption</span>
            </Link>
          </div>

          <div className="flex space-x-6">
            <NavLink
              to="/pet-listings"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                  isActive
                    ? "bg-white text-purple-600 shadow-md"
                    : "text-white hover:bg-white/20"
                }`
              }
            >
              🐾 Pet Listings
            </NavLink>

            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                  isActive
                    ? "bg-white text-purple-600 shadow-md"
                    : "text-white hover:bg-white/20"
                }`
              }
            >
              🔔 Notifications
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
