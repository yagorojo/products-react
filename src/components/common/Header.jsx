import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Header() {
  const userContext = useContext(UserContext);

  return (
    <div className="bg-indigo-600">
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              aria-label="Company"
              title="Company"
              className="inline-flex items-center mr-8"
            >
              <span className="text-xl font-bold tracking-wide text-white uppercase">
                Dotstore
              </span>
            </Link>
          </div>
          <ul className="flex items-center space-x-8 lg:flex">
            {!userContext.token ? (
              <li>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center h-12 px-6 tracking-wide text-indigo-800 hover:text-emerald-300 font-bold transition duration-200 rounded shadow-md bg-emerald-300 hover:bg-indigo-800 focus:shadow-outline focus:outline-none"
                  aria-label="Sign up"
                >
                  Access
                </Link>
              </li>
            ) : (
              <div className="flex space-x-3 items-center">
                <li>
                  <button
                    onClick={userContext.logout}
                    className="inline-flex items-center justify-center h-12 px-6 tracking-wide text-indigo-800 hover:text-red-300 font-bold transition duration-200 rounded shadow-md bg-red-300 hover:bg-indigo-800 focus:shadow-outline focus:outline-none"
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="inline-flex items-center justify-center h-12 px-6 tracking-wide text-indigo-800 hover:text-emerald-300 font-bold transition duration-200 rounded shadow-md bg-emerald-300 hover:bg-indigo-800 focus:shadow-outline focus:outline-none"
                    aria-label="Admin panel"
                  >
                    Admin Panel
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
