import React from 'react'
// Icons & Images
import logo from "@/assets/images/logo.svg";
import iconGooglePlay from "@/assets/images/icon-google-play.svg";
import iconAppStore from "@/assets/images/icon-app-store.svg";
import iconPublicOffer from "@/assets/images/icon-public-offer.svg";
import iconStar from "@/assets/images/icon-star.svg";
import iconQuestion from "@/assets/images/icon-question.svg";
import iconCall from "@/assets/images/icon-call.svg";
import iconMovie from "@/assets/images/icon-movie.svg";
import iconTheater from "@/assets/images/icon-theater.svg";
import iconConcert from "@/assets/images/icon-concert.svg";
import iconSport from "@/assets/images/icon-sport.svg";
import iconIG from "@/assets/images/icon-ig.svg";
import iconFacebook from "@/assets/images/icon-facebook.svg";
import iconYouTube from "@/assets/images/icon-youtube.svg";
// import { TbBrandGooglePlay } from "react-icons/tb";
// import { RiAppStoreLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className='site_footer mt-14 sm:mt-16 mb-20 md:mb-5 md:mt-20 lg:mt-[120px]'>
      <div className='container'>
        <div className='footer_wrapper rounded-xl bg-bg-dark-800 light:bg-bg-light-700 px-4 py-[30px] sm:p-[30px] grid gap-10 grid-cols-2 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.2fr] text-sm sm:text-base leading-5 tracking-wide'>
          <div className='flex flex-col items-start justify-between'>
            <img src={logo} alt="Site Logo" />
            <div className='flex-col gap-2 flex'>
              <img className='cursor-pointer w-32 md:w-[150px]' src={iconGooglePlay} alt="Icon Google Play" />
              <img className='cursor-pointer w-32 md:w-[150px]' src={iconAppStore} alt="Icon App Store" />
            </div>
          </div>
          <div className='flex flex-col gap-[18px]'>
            <p className='text-text-dark-100 light:text-text-light-100'>About</p>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img className='w-5 sm:w-6' src={iconPublicOffer} alt="Icon Public Offer" />
              <span className='link_hover_footer'>Public offer</span>
            </div>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img className='w-5 sm:w-6' src={iconStar} alt="Icon Star" />
              <span className='link_hover_footer'>Advertising</span>
            </div>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img className='w-5 sm:w-6' src={iconQuestion} alt="Icon Question" />
              <span className='link_hover_footer'>F.A.Q</span>
            </div>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img className='w-5 sm:w-6' src={iconCall} alt="Icon Contact" />
              <span className='link_hover_footer'>Contacts</span>
            </div>
          </div>
          <div className='flex flex-col gap-[18px]'>
            <p className='text-text-dark-100 light:text-text-light-100'>Categories</p>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img className='w-5 sm:w-6' src={iconMovie} alt="Icon Movie" />
              <span className='link_hover_footer'>Movie</span>
            </div>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img className='w-5 sm:w-6' src={iconTheater} alt="Icon Theater" />
              <span className='link_hover_footer'>Theater</span>
            </div>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img className='w-5 sm:w-6' src={iconConcert} alt="Icon Concert" />
              <span className='link_hover_footer'>Concerts</span>
            </div>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img className='w-5 sm:w-6' src={iconSport} alt="Icon Sport" />
              <span className='link_hover_footer'>Sport</span>
            </div>
          </div>
          <div className='flex flex-col gap-7 justify-between'>
            <div className='flex flex-col gap-4 sm:gap-5'>
              <p className='text-text-dark-100 light:text-text-light-100'>Contact us</p>
              <p className='text-sm sm:text-base md:text-lg text-primary'>+998 (77) 276-03-11</p>
            </div>
            <div className='flex flex-col gap-5'>
              <p className='text-text-dark-100 light:text-text-light-100'>Social media</p>
              <div className='flex items-center gap-5'>
                <img className='hover:scale-105 duration-150 ease-out cursor-pointer w-5 sm:w-6' src={iconIG} alt="Icon Instagram" />
                <img className='hover:scale-105 duration-150 ease-out cursor-pointer w-5 sm:w-6' src={iconFacebook} alt="Icon Facebook" />
                <img className='hover:scale-105 duration-150 ease-out cursor-pointer w-5 sm:w-6' src={iconYouTube} alt="Icon You Tuba" />
           
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default React.memo(Footer);