import React from 'react'
// Icons & Images
import logo from "@/assets/images/logo-full.svg";
import iconAppStore from "@/assets/images/icon-app-store.svg";

const Footer = () => {
  return (
    <footer className='site_footer sm:mt-16 mb-5 md:mt-20 lg:mt-[120px]'>
      <div className='container'>
        <div className='footer_wrapper rounded-xl bg-bg-dark-800 light:bg-bg-light-700 px-4 py-[30px] sm:p-[30px] text-sm sm:text-base leading-5 tracking-wide'>
          <div className='flex items-center justify-between'>
            <div>
              <img src={logo} alt="Site Logo" />
            </div>
            <div className='flex flex-col gap-2'>
              <img className='cursor-pointer w-32 md:w-[150px]' src={iconAppStore} alt="Icon App Store" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default React.memo(Footer);