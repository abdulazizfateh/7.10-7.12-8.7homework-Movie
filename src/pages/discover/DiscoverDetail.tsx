import React, { useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { IMAGE_URL } from '@/const';
// React Query
import { useMovies } from '@/api/hooks/useMovies';
// Types
import type { IMovie, IMovieDetail } from '@/types/types';
// Components
import MovieCard from '@/components/MovieCard/MovieCard';
// Icons
import { GrFormNext, GrPrevious } from 'react-icons/gr';
import { RiBookmarkFill, RiBookmarkLine, RiPlayFill } from 'react-icons/ri';
import { useStore } from '@/zustand/useStore';

const DiscoverDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id])

  const { getMovieDetail, getAdditionalMovieDetail } = useMovies();
  // Poster Info 
  const { data, isPending } = getMovieDetail(id || "");
  const detailMovieData: IMovieDetail = data;

  // Similar
  const { data: similarMovieFullData, isLoading } = getAdditionalMovieDetail(id || "", "similar");
  const similarMovieData: IMovie[] = similarMovieFullData?.results?.slice(0, 5);


  // Zustand - Saved
  const { saved, toggleSaved } = useStore();

  const handleSaved = (detailMovieData: any) => {
    toggleSaved(detailMovieData);
  }
  return (
    <>
      {
        isPending ?
          <div className='section_movie_detail_play_loading max-w-[1594px] px-3 md:px-8 h-[270px] sm:h-[400px] md:h-[500px] lg:h-[640px] mx-auto'>
            <div className='w-full h-full bg-bg-dark-700 light:bg-bg-light-700 rounded-xl relative'>
              <button onClick={(() => nav(-1))} className='absolute top-2.5 left-2.5 md:top-3 md:left-3 px-5 py-2 rounded-xl bg-bg-dark-900/40 cursor-pointer flex items-center justify-center'>
                <GrPrevious className='text-text-dark-100 text-lg md:text-xl lg:text-[22px]' />
              </button>
            </div>
          </div>
          :
          <section className='section_movie_play max-w-[1594px] mx-auto px-3 md:px-8'>
            <div className='w-full relative'>
              {
                detailMovieData?.backdrop_path ?
                  <img loading='eager' className='w-full h-[270px] sm:h-[400px] md:h-[500px] lg:h-[640px] object-cover rounded-xl select-none' src={IMAGE_URL + detailMovieData?.backdrop_path} alt={detailMovieData?.title} />
                  :
                  <div className='section_movie_detail_image_backup flex flex-col items-center justify-center h-[270px] sm:h-[400px] md:h-[500px] lg:h-[640px] mx-auto bg-bg-dark-700 light:bg-bg-light-700 rounded-xl'>
                    <p className='text-center text-sm md:text-base text-text-dark-500 light:text-text-light-600'>Poster is not found</p>
                  </div>
              }
              <button onClick={(() => nav(-1))} className='absolute top-2.5 left-2.5 md:top-3 md:left-3 px-5 py-2 rounded-xl bg-bg-dark-900/40 cursor-pointer flex items-center justify-center'>
                <GrPrevious className='text-text-dark-100 text-lg md:text-xl lg:text-[22px]' />
              </button>
              <button onClick={() => handleSaved(detailMovieData)} className='absolute top-2.5 right-2.5 md:top-3 md:right-3 size-8 md:size-9 lg:size-11 rounded-xl bg-bg-dark-900/40 cursor-pointer flex items-center justify-center'>
                {
                  saved.some(item => item.id === detailMovieData?.id) ? <RiBookmarkFill className='text-text-dark-100 text-lg md:text-xl lg:text-2xl' /> :
                    <RiBookmarkLine className='text-text-dark-100 text-lg md:text-xl lg:text-2xl' />
                }
              </button>
              <div className='absolute right-1/2 bottom-3 md:bottom-6 translate-x-1/2 flex flex-col gap-1.5 sm:gap-3 md:gap-4 w-full'>
                <h1 className='text-xl sm:text-[22px] md:text-[28px] text-center lg:text-[32px] w-[98%] sm:w-[80%] mx-auto md:w-full text-text-dark-100 tracking-wide text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]'>
                  {detailMovieData.title}
                </h1>
                <div className='flex items-center justify-center'>
                  <button className='w-[50%] min-[450px]:w-[300px] md:w-[380px] h-[38px] sm:h-[52px] flex items-center justify-center gap-[7px] bg-text-dark-100 rounded-xl text-primary'>
                    <RiPlayFill className='text-xl md:text-2xl' />
                    <span className='text-base tracking-wide md:text-lg'>Watch</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
      }
      <section className='section_movie_detail_play max-w-[98%] mx-auto min-[440px]:max-w-[400px] min-h-[50vh] w-full mt-8 md:mt-12 mb-20 sm:mb-28 md:mb-36 lg:mb-40 px-3 sm:px-0'>
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
            <MovieCard data={similarMovieData} isLoading={isLoading} cardQuantity={4} />
          </div>
        </div>
      </section>
    </>
  )
}

export default React.memo(DiscoverDetail);