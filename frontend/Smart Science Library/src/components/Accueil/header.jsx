import { Fragment, useState } from "react";
import { UserPlus, Search, BookOpen } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Header() {
  const [showList, setShowList] = useState(false);
  return (
    <header className=" fixed w-full bg-stone-900 text-cyan-50 z-10 flex flex-row  justify-around items-center  ">
      <h1 className="lg:text-4xl font-bold text-center font-stretch-ultra-expanded md:text-3xl p-5 md:p-2 flex flex-row items-center gap-3">
        <BookOpen size={32} />
        Smart Science Library
      </h1>

      {/* nave bar */}
      <nav className=" flex flex-row justify-between items-center  ">
        <ul className="flex flex-row gap-5  mr-10">
          <li className="  ">
            <NavLink to="/" className="hover:cursor-pointer  hover:scale-105 ">
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/catalogue"
              className="relative cursor-pointer   pr-1 pl-1 hover:scale-105  "
              onClick={() => {
                setShowList((value) => !value);
              }}
            >
              Livres
            </NavLink>

            {showList && (
              <div className=" absolute z-10 mt-2 py-1 w-48 bg-white rounded-md shadow-xl">
                <NavLink
                  to="/livres/maths"
                  className="block px-4 py-2 text-gray-800 hover:bg-green-500 hover:text-white"
                >
                  Mathématiques
                </NavLink>

                <NavLink
                  to="/livres/physique"
                  className="block px-4 py-2 text-gray-800 hover:bg-green-500 hover:text-white"
                >
                  Pysique
                </NavLink>
                <NavLink
                  to="/livres/chimie"
                  className="block px-4 py-2 text-gray-800 hover:bg-green-500 hover:text-white"
                >
                  Chimie
                </NavLink>
                <NavLink
                  to="/livres/svt"
                  className="block px-4 py-2 text-gray-800 hover:bg-green-500 hover:text-white"
                >
                  Sience de la vie
                </NavLink>
              </div>
            )}
          </li>
          <li>
            <NavLink
              to="/catalogue"
              className="relative cursor-pointer  hover:scale-105   "
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="relative cursor-pointer   hover:scale-105  "
            >
              A propos
            </NavLink>
          </li>
        </ul>
        <form className="flex justify-center   ">
          <input
            type="search"
            name="searchBook"
            id="searchbar"
            placeholder="Search..."
            className="lg:block border-1 border-white relative  w-3xs  text-white mr-2
            p-0.5 mb-1 text-[15px] rounded-xl sm:hidden"
          />

          <button
            type="submit"
            className="lg:relative lg:right-15 md:ml-4 md:border md:p-2 md:rounded-xl lg:border-0  hover:cursor-pointer "
          >
            <Search size={17} />
          </button>
        </form>
      </nav>

      <div className="pr-2 md:text-2xs flex justify-center items-center">
        <NavLink
          to="/login"
          className="flex justify-center items-center border-white border ml-3  rounded-xl p-1 hover:cursor-pointer hover:bg-gray-400"
        >
          <UserPlus
            size={24}
            className="items-center  mr-2 hover:text-green-700 "
          />
          <p className="     mr-2 hover:text-black  sm:hidden lg:block md:hidden ">
            connexion
          </p>
        </NavLink>
        <NavLink
          to="/register"
          className="border rounded-xl p-1 hover:bg-white  hover:text-black bg-green-700 hover:cursor-pointer md:ml-1"
        >
          Inscription
        </NavLink>
      </div>
    </header>
  );
}
