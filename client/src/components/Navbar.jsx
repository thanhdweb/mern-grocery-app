import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "./../assets/assets";
import { useAppContext } from "./../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  // show/hidden thanh search
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <nav className="flex items-center justify-between px-4 md:px-14 lg:px-14 py-4 border-b border-gray-300 bg-white relative transition-all z-40">
      <NavLink to={"/"} onClick={() => setOpen(false)}>
        <img
          className="h-9 w-35 md:w-40 lg:w-44"
          src={assets.logo}
          alt="logo"
        />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center sm:gap-5 md:gap-6 xl:gap-8">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/products"}>All Product</NavLink>

        <div
          className="flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full 
                sm:w-40 md:w-52 lg:w-64 xl:w-80 transition-all duration-200"
        >
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search..."
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} alt="" className="w-10" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                onClick={() => navigate("my-orders")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                Logout
              </li>
              <li className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer">
                <NavLink to="/seller" className="block w-full h-full">
                  Dashboard seller
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="flex items-center gap-4 sm:hidden relative">
        <div
          className={`flex items-center border border-gray-300 rounded-full bg-white transition-all duration-400 ${
            showMobileSearch
              ? "w-30 sm:50 h-8 pl-2 pr-1 py-1.5"
              : "w-8 h-8 pl-2 justify-center"
          } overflow-hidden`}
        >
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="flex-shrink-0"
          >
            <img src={assets.search_icon} alt="search" className="w-4 h-4" />
          </button>

          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`bg-transparent outline-none text-sm placeholder-gray-500 ml-2 transition-all duration-200 ${
              showMobileSearch ? "w-full" : "w-0"
            }`}
            type="text"
            placeholder="Search"
          />
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {/* Menu Icon */}
        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className=""
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
        >
          <NavLink to={"/"} onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to={"/products"} onClick={() => setOpen(false)}>
            All Product
          </NavLink>
          {user && (
            <NavLink to={"/my-orders"} onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}
          <NavLink to={"/seller"} onClick={() => setOpen(false)}>
            Dashboard seller
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
