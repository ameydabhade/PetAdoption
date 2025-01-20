import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={
                  "https://media.istockphoto.com/id/837572972/photo/lost-and-homeless-abandoned-dog.jpg?s=612x612&w=0&k=20&c=eN1O0_oSgK1K15LEofqxQJAVDJPNne4QsiaxKg3RIOI="
                }
                alt="PetAdoption Logo"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          <div className="flex space-x-8">
            <Link
              to="/pet-listings"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Pet Listings
            </Link>

            <Link
              to="/notifications"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Notifications
            </Link>

            <Link
              to="/adoption-form"
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Adoption Form
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
