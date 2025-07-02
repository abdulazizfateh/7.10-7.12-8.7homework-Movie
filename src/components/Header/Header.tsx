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
import { GrMenu } from "react-icons/gr";
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

  return (
    <>
      <header className='site_header bg-bg-dark-900 light:bg-bg-light-900'>
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
            <div className='flex items-center gap-2 md:gap-5'>
              <button onClick={handleTheme} className='hidden md:flex h-9 px-2 md:h-12 md:px-3 items-center gap-2 bg-bg-dark-800 hover:bg-bg-dark-700 light:bg-bg-light-700 light:hover:bg-bg-light-800 duration-150 ease-out rounded-xl'>
                {
                  theme ? <PiMoonLight className="text-xl text-text-dark-100 light:text-text-light-100" /> : <GoSun className="text-xl" />
                }
              </button>
              <button className='md:hidden'>
                <GrMenu className="text-2xl text-primary" />
              </button>
              <button className='hidden md:block bg-primary rounded-xl h-12 px-10 xl:h-14 xl:px-14 tracking-wide'>
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