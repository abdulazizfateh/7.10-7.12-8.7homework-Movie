import React from 'react'
import { NavLink } from 'react-router-dom'
// Icons
import { GoHome } from "react-icons/go";
import { IoCompassOutline } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";

import { GoHomeFill } from "react-icons/go";
import { IoCompass } from "react-icons/io5";
import { RiSearchFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";

const NavMobile = () => {
    return (
        <>
            <div className='fixed bottom-0 left-0 w-full md:hidden bg-bg-dark-800 light:bg-bg-light-900 z-20'>
                <div className="container">
                    <div className="flex items-start justify-between min-[440px]:justify-around h-[60px] sm:h-[70px] px-4">
                        <NavLink onClick={()=> window.scrollTo(0, 0)} className='h-full flex items-center justify-center px-3 min-[400px]:px-4' to={"/"}>
                            {
                                ({ isActive }) => (
                                    isActive ? <GoHomeFill className="text-2xl" />
                                        :
                                        <GoHome className='text-2xl' />
                                )
                            }
                        </NavLink>
                        <NavLink onClick={()=> window.scrollTo(0, 0)} className='h-full flex items-center justify-center px-3 min-[400px]:px-4' to={"/discover"}>
                            {
                                ({ isActive }) => (
                                    isActive ? <IoCompass className="text-2xl" />
                                        :
                                        <IoCompassOutline className='text-2xl' />
                                )
                            }
                        </NavLink>
                        <NavLink onClick={()=> window.scrollTo(0, 0)} className='h-full flex items-center justify-center px-3 min-[400px]:px-4' to={"/search"}>
                            {
                                ({ isActive }) => (
                                    isActive ? <RiSearchFill className="text-2xl" />
                                        :
                                        <RiSearchLine className='text-2xl' />
                                )
                            }
                        </NavLink>
                        <NavLink onClick={()=> window.scrollTo(0, 0)} className='h-full flex items-center justify-center px-3 min-[400px]:px-4' to={"/saved"}>
                            {
                                ({ isActive }) => (
                                    isActive ?
                                        <FaUser className='text-xl' />
                                        :
                                        <FaRegUser className='text-xl' />
                                )
                            }
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(NavMobile);