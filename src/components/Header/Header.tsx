import React, { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
// // Icons & Images
import logo from "@/assets/images/logo-full.svg";
import { GoHome } from "react-icons/go";
import { IoCompassOutline } from "react-icons/io5";
import { RiBookmarkLine } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";

import { GoHomeFill } from "react-icons/go";
import { IoCompass } from "react-icons/io5";
// import { RiBookmarkFill } from "react-icons/ri";
import { RiSearchFill } from "react-icons/ri";

import { GoSun } from "react-icons/go";
import { PiMoonLight } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 0 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Theme
  const root = document.documentElement.classList;
  const [theme, setTheme] = useState<boolean>(JSON.parse(localStorage.getItem("theme") || "false"));

  useEffect(() => {
    if (theme) {
      root.add("light")
    } else {
      root.remove("light");
    }
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme])

  const handleTheme = () => {
    setTheme(prev => !prev);
  }

  return (
    <>
      <header className={`fixed bottom-0 left-0 w-full md:hidden bg-bg-dark-800 light:bg-bg-light-900 z-20 transition-transform ${isVisible ? "translate-y-0" : "translate-y-full"}`}>
        <div className="container">
          <nav className="flex items-center justify-between min-[440px]:justify-around h-14 sm:h-16 px-4">
            <NavLink className='h-full flex items-center justify-center px-3 min-[400px]:px-4' to={"/"}>
              {
                ({ isActive }) => (
                  isActive ? <GoHomeFill className="text-2xl" />
                    :
                    <GoHome className='text-2xl' />
                )
              }
            </NavLink>
            <NavLink className='h-full flex items-center justify-center px-3 min-[400px]:px-4' to={"/discover"}>
              {
                ({ isActive }) => (
                  isActive ? <IoCompass className="text-2xl" />
                    :
                    <IoCompassOutline className='text-2xl' />
                )
              }
            </NavLink>
            <NavLink className='h-full flex items-center justify-center px-3 min-[400px]:px-4' to={"/search"}>
              {
                ({ isActive }) => (
                  isActive ? <RiSearchFill className="text-2xl" />
                    :
                    <RiSearchLine className='text-2xl' />
                )
              }
            </NavLink>
            <NavLink className='h-full flex items-center justify-center px-3 min-[400px]:px-4' to={"/saved"}>
              {
                ({ isActive }) => (
                  isActive ?
                    <FaUser className='text-xl' />
                    :
                    <FaRegUser className='text-xl' />
                )
              }
            </NavLink>
          </nav>
        </div>
      </header>
      <header className='site_header hidden md:block bg-bg-dark-800 light:bg-bg-light-900'>
        <div className="container">
          <nav className='flex items-center justify-between h-20 relative'>
            <div>
              <Link to={"/"} className='cursor-pointer'>
                <img src={logo} alt="Site Logo" />
              </Link>
            </div>
            <ul className='flex items-center gap-6 absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2'>
              <li>
                <NavLink
                  to="/" className="h-12 px-1 flex flex-col items-center justify-between" children={({ isActive }) => (
                    <>
                      <GoHome className={`text-2xl ${isActive ? "text-primary" : "text-text-dark-100 light:text-text-light-100"}`} />
                      <span className={`text-xs !font-semibold tracking-wide ${isActive ? "text-primary" : "text-text-dark-500 light:text-text-light-100"}`}>Home</span>
                    </>
                  )}
                />
              </li>
              <li>
                <NavLink
                  to="/discover"
                  className="h-12 px-1 flex flex-col items-center justify-between"
                >
                  {
                    ({ isActive }) => (
                      <>
                        <IoCompassOutline className={`text-2xl ${isActive ? "text-primary" : "text-text-dark-100 light:text-text-light-100"}`} />
                        <span className={`text-xs !font-semibold tracking-wide ${isActive ? "text-primary" : "text-text-dark-500 light:text-text-light-100"}`}>Discover</span>
                      </>
                    )
                  }
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/saved"
                  className="h-12 px-1 flex flex-col items-center justify-between"
                >
                  {
                    ({ isActive }) => (
                      <>
                        <RiBookmarkLine className={`text-[23px] ${isActive ? "text-primary" : "text-text-dark-100 light:text-text-light-100"}`} />
                        <span className={`text-xs !font-semibold tracking-wide ${isActive ? "text-primary" : "text-text-dark-500 light:text-text-light-100"}`}>Saved</span>
                      </>
                    )
                  }
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/search"
                  className="h-12 px-1 flex flex-col items-center justify-between"
                >
                  {
                    ({ isActive }) => (
                      <>
                        <RiSearchLine className={`text-2xl ${isActive ? "text-primary" : "text-text-dark-100 light:text-text-light-100"}`} />
                        <span className={`text-xs tracking-wide ${isActive ? "text-primary" : "text-text-dark-500 light:text-text-light-100"}`}>Search</span>
                      </>
                    )
                  }
                </NavLink>
              </li>
            </ul>
            <div className='flex items-center gap-5'>
              <button onClick={handleTheme} className='flex items-center gap-2 bg-[#1D1D1D80] hover:bg-bg-dark-900 duration-150 ease-out light:hover:bg-bg-light-800 light:bg-bg-light-700 h-12 px-3 rounded-xl'>
                {
                  theme ? <PiMoonLight className="text-xl" /> : <GoSun className="text-xl" />
                }
              </button>
              <button className='bg-primary rounded-xl h-10 px-9 lg:h-12 lg:px-10 xl:h-14 xl:px-14 tracking-wide'>
                <span className="text-text-dark-100">Sign in</span>
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default React.memo(Header);