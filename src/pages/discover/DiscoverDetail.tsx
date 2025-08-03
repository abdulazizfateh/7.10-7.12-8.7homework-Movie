import React, { useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { IMAGE_URL } from '@/const';
// React Query
import { useMovies } from '@/api/hooks/useMovies';
// Types
import type { IMovie, IMovieDetail, IUser } from '@/types/types';
// Components
import MovieCard from '@/components/MovieCard/MovieCard';
// Icons
import { GrFormNext } from 'react-icons/gr';
import { RiBookmarkFill, RiBookmarkLine, RiPlayFill } from 'react-icons/ri';
import { useStore } from '@/zustand/useStore';

const DiscoverDetail = () => {
  const nav = useNavigate();
  const savedUserInfo = localStorage.getItem("user_info");
  const userInfo: IUser | null = savedUserInfo ? JSON.parse(savedUserInfo) : null;

  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id])

  // Detail Data
  const { getMovieDetail, getAdditionalMovieDetail } = useMovies();
  const { data, isPending } = getMovieDetail(id || "");
  const detailMovieData: IMovieDetail = data;

  const { data: similarMovieFullData, isLoading } = getAdditionalMovieDetail(id || "", "similar");
  const similarMovieData: IMovie[] = similarMovieFullData?.results?.slice(0, window.innerWidth < 640 ? 6 : window.innerWidth < 940 ? 6 : window.innerWidth < 1280 ? 8 : 10);

  // Zustand - Saved
  const { saved, toggleSaved } = useStore();

  const handleSaved = (detailMovieData: any) => {
    if (userInfo) {
      toggleSaved(detailMovieData);
    } else {
      nav("/signin");
    }
  }

  return (
    <>
      {
        isPending ?
          <div className='section_movie_detail_play_loading max-w-[1594px] md:px-8 h-[500px] lg:h-[640px] mx-auto'>
            <div className='w-full h-full bg-bg-dark-700 light:bg-bg-light-700 md:rounded-xl relative'>
            </div>
          </div>
          :
          <section className='section_movie_play max-w-[1594px] mx-auto md:px-8'>
            <div className='w-full relative'>
              {
                detailMovieData?.backdrop_path ?
                  <div className='relative overflow-hidden md:rounded-xl'>
                    <div className="absolute inset-0 bg-gradient-to-t to-transparent dark:from-black/90 dark:via-black/0" />
                    <img loading='eager' className='w-full h-[500px] md:rounded-xl lg:h-[640px] object-cover select-none' src={IMAGE_URL + detailMovieData?.backdrop_path} alt={detailMovieData?.title} />
                  </div>
                  :
                  <div className='section_movie_detail_image_backup flex flex-col items-center justify-center h-[500px] lg:h-[640px] mx-auto bg-bg-dark-700 light:bg-bg-light-700 rounded-xl'>
                    <p className='text-center text-sm md:text-base text-text-dark-500 light:text-text-light-600'>Poster is not found</p>
                  </div>
              }
              <div className='absolute right-1/2 bottom-3 md:bottom-6 translate-x-1/2 flex flex-col gap-1.5 sm:gap-3 lg:gap-4 w-full'>
                <h1 className='text-xl sm:text-[22px] md:text-[26px] text-center lg:text-[28px] w-[98%] sm:w-[80%] mx-auto md:w-full text-text-dark-100 tracking-wide text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]'>
                  {detailMovieData.title}
                </h1>
                <div className='flex items-center justify-center mb-1 sm:mb-0'>
                  <p className='text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] text-[13px] sm:text-sm tracking-wide text-text-dark-100'>{detailMovieData?.runtime === 0 ? "0h" : Math.floor(detailMovieData?.runtime / 60) === 0 ? "" : Math.floor((detailMovieData?.runtime / 60)) + "h"} {detailMovieData?.runtime % 60 === 0 ? "" : detailMovieData?.runtime % 60 + "min"}</p>
                </div>
                <div className='flex items-center justify-center gap-1.5'>
                  <button className='w-[55px] md:w-[70px] xl:w-[270px] h-[38px] sm:h-[44px] lg:h-[52px] shadow-2xl flex items-center justify-center gap-[7px] bg-text-dark-100 rounded-xl text-primary'>
                    <RiPlayFill className='text-2xl lg:text-3xl' />
                    <span className='text-base tracking-wide md:text-lg hidden xl:block'>Watch</span>
                  </button>
                  <button onClick={() => handleSaved(detailMovieData)} className='w-[55px] md:w-[70px] h-[38px] sm:h-[44px] lg:h-[52px] shadow-2xl bg-bg-light-900 rounded-xl flex items-center justify-center'>
                    {
                      saved.some(item => item.id === detailMovieData?.id) ? <RiBookmarkFill className='text-primary text-xl lg:text-2xl' /> :
                        <RiBookmarkLine className='text-primary text-xl lg:text-2xl' />
                    }
                  </button>
                </div>
              </div>
            </div>
          </section>
      }
      <section className='section_movie_detail_play max-w-full mx-auto min-[440px]:max-w-[400px] min-h-[50vh] w-full mt-8 md:mt-12 mb-16 md:mb-20 lg:mb-24 px-3 sm:px-0'>
        <div className='movie_detail_wrapper'>
          <div className='w-full h-12 md:h-14 p-0.5 rounded-xl bg-bg-dark-800 light:bg-gray-50 flex items-center'>
            <NavLink to={""} end={true} className='movie_detail_tab w-1/2 h-full rounded-xl flex items-center justify-center text-sm md:text-base'>
              Movie details
            </NavLink>
            <NavLink to={"cast"} className='movie_detail_tab w-1/2 h-full rounded-xl flex items-center justify-center text-sm md:text-base'>Cast</NavLink>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </section>
      <section className='section_similar_movies'>
        <div className="container">
          <div className='similar_movies_wrapper'>
            <div className='trending_movies_title_wrapper flex items-center justify-between w-full mb-4'>
              <p className='text-base sm:text-xl leading-6 tracking-wide text-text-dark-100 light:text-text-light-100'>Similar movies</p>
              <Link to={"/discover"}
                className="flex items-center link_hover">
                <span className='text-sm sm:text-base'>Show all</span>
                <GrFormNext className='text-xl' />
              </Link>
            </div>
            <MovieCard data={similarMovieData} isLoading={isLoading} cardQuantity={window.innerWidth < 640 ? 6 : window.innerWidth < 940 ? 6 : window.innerWidth < 1280 ? 8 : 10} />
          </div>
        </div>
      </section>
    </>
  )
}

export default React.memo(DiscoverDetail);