import React, { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
// // Icons & Images
import logo from "@/assets/images/logo-full.svg";
import { GoHome } from "react-icons/go";
import { IoCompassOutline } from "react-icons/io5";
import { RxBookmark } from "react-icons/rx";
import { RiSearchLine } from "react-icons/ri";

import { GoHomeFill } from "react-icons/go";
import { IoCompass } from "react-icons/io5";
import { RxBookmarkFilled } from "react-icons/rx";
import { RiSearchFill } from "react-icons/ri";
// import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { GoSun } from "react-icons/go";
import { PiMoonLight } from "react-icons/pi";

const Header = () => {
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

  const handleMenuClose = () => {
    setIsOpen(false)
    console.log(10);

  }

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <header className={`site_header bg-bg-dark-900 light:bg-bg-light-900 relative z-50 flex justify-between items-center transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}>
        <div className="container">
          <nav className='flex items-center justify-between h-[68px] md:h-20 relative'>
            <div>
              <Link to={"/"} className='cursor-pointer'>
                <img className="w-24 md:w-[103px]" src={logo} alt="Site Logo" />
              </Link>
            </div>
            <ul className='hidden md:flex items-center gap-6 absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2'>
              <li>
                <NavLink
                  to="/" className="h-12 px-1 flex flex-col items-center justify-between" children={({ isActive }) => (
                    <>
                      {
                        isActive ? <GoHomeFill className='text-2xl text-primary' /> : <GoHome className='text-2xl text-text-dark-100 light:text-text-light-100' />
                      }
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
                        {
                          isActive ? <IoCompass className='text-2xl text-primary' /> : <IoCompassOutline className='text-2xl text-text-dark-100 light:text-text-light-100' />
                        }
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
                        {isActive ? <RxBookmarkFilled className='text-2xl text-primary' /> : <RxBookmark className='text-[23px] text-text-dark-100 light:text-text-light-100' />}
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
                        {
                          isActive ? <RiSearchFill className='text-[23px] text-primary' /> : <RiSearchLine className='text-[23px] text-text-dark-100 light:text-text-light-100' />
                        }
                        <span className={`text-xs tracking-wide ${isActive ? "text-primary" : "text-text-dark-500 light:text-text-light-100"}`}>Search</span>
                      </>
                    )
                  }
                </NavLink>
              </li>
            </ul>
            <div className='flex items-center gap-2 md:gap-3'>
              <button onClick={handleTheme} className='hidden md:flex size-11 xl:size-12 items-center justify-center gap-2 bg-bg-dark-800 hover:bg-bg-dark-700 light:bg-bg-light-700 light:hover:bg-bg-light-800 duration-150 ease-out rounded-full'>
                {
                  theme ? <PiMoonLight className="text-2xl text-text-dark-100 light:text-text-light-100" /> : <GoSun className="text-2xl" />
                }
              </button>



              <button className='hidden md:block bg-primary rounded-xl h-11 px-10 xl:h-12 xl:px-12 tracking-wide'>
                <span className="text-text-dark-100">Sign in</span>
              </button>
            </div>
          </nav>
        </div>
      </header>
      <div className="absolute w-full top-5 right-2 flex items-center justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col justify-between z-50 items-end space-y-2 p-2 sm:px-4 md:hidden"
        >
          <span
            className={`block h-[1px] w-5 bg-white transform transition-all duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
          />
          <span
            className={`block h-[1px] w-5 bg-white transform transition-all duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
          />
        </button>
      </div>
      <div
        className={`fixed top-0 right-0 h-screen w-full bg-bg-dark-900 light:bg-bg-light-900 z-40 transform transition-transform duration-200 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="w-full h-full bg-bg-dark-900 light:bg-bg-light-900 p-[12px]">
          <nav className="">
            <div className="h-[68px] md:h-20 flex items-start">
            </div>
            <ul className='flex flex-col gap-6 absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2'>
              <li>
                <NavLink onClick={handleMenuClose}
                  to="/" className="h-12 px-1 flex flex-col items-center justify-between" children={({ isActive }) => (
                    <>
                      {
                        isActive ? <GoHomeFill className='text-2xl text-primary' /> : <GoHome className='text-2xl text-text-dark-100 light:text-text-light-100' />
                      }
                      <span className={`text-xs !font-semibold tracking-wide ${isActive ? "text-primary" : "text-text-dark-500 light:text-text-light-100"}`}>Home</span>
                    </>
                  )}
                />
              </li>
              <li>
                <NavLink onClick={handleMenuClose}
                  to="/discover"
                  className="h-12 px-1 flex flex-col items-center justify-between"
                >
                  {
                    ({ isActive }) => (
                      <>
                        {
                          isActive ? <IoCompass className='text-2xl text-primary' /> : <IoCompassOutline className='text-2xl text-text-dark-100 light:text-text-light-100' />
                        }
                        <span className={`text-xs !font-semibold tracking-wide ${isActive ? "text-primary" : "text-text-dark-500 light:text-text-light-100"}`}>Discover</span>
                      </>
                    )
                  }
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleMenuClose}
                  to="/saved"
                  className="h-12 px-1 flex flex-col items-center justify-between"
                >
                  {
                    ({ isActive }) => (
                      <>
                        {isActive ? <RxBookmarkFilled className='text-2xl text-primary' /> : <RxBookmark className='text-[23px] text-text-dark-100 light:text-text-light-100' />}
                        <span className={`text-xs !font-semibold tracking-wide ${isActive ? "text-primary" : "text-text-dark-500 light:text-text-light-100"}`}>Saved</span>
                      </>
                    )
                  }
                </NavLink>
              </li>
              <li>
                <NavLink onClick={handleMenuClose}
                  to="/search"
                  className="h-12 px-1 flex flex-col items-center justify-between"
                >
                  {
                    ({ isActive }) => (
                      <>
                        {
                          isActive ? <RiSearchFill className='text-[23px] text-primary' /> : <RiSearchLine className='text-[23px] text-text-dark-100 light:text-text-light-100' />
                        }
                        <span className={`text-xs tracking-wide ${isActive ? "text-primary" : "text-text-dark-500 light:text-text-light-100"}`}>Search</span>
                      </>
                    )
                  }
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default React.memo(Header);