import React, { useState } from 'react';
import { IMAGE_URL } from '@/const';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
// Swiper CSS
import './style.css';
import 'swiper/swiper-bundle.css';
// React Query
import { useMovies } from '@/api/hooks/useMovies';
import { useGenre } from '@/api/hooks/useGenre';
import type { IGenre, IMovie } from '@/types/types';
// Icons
import { RiPlayFill } from "react-icons/ri";
import fallbackImage from "@/assets/images/fallback-image.webp"

// Swiper Type
import type { Swiper as SwiperType } from 'swiper';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const nav = useNavigate();

    // Movies Data
    const { getMovies } = useMovies();
    const { data, isLoading } = getMovies({ page: 4, without_genres: "18,36,27,10749" });
    const moviesData: IMovie[] = data?.results?.slice(0, 8) || [];


    // Genre List Data
    const { getGenre } = useGenre();
    const { data: genreResult } = getGenre;
    const genresListData: IGenre[] = genreResult?.genres || [];

    const getGenreNames = (id: number) => {
        return genresListData?.find((item: IGenre) => item?.id === id);
    };

    return (
        <section className='section_hero max-w-[1594px] mx-auto w-full flex flex-col gap-2 px-3 md:px-8'>
            {isLoading && (
                <>
                    <div className='max-w-[1530px] h-[270px] sm:h-[400px] md:h-[500px] lg:h-[640px] rounded-xl bg-bg-dark-700 light:bg-bg-light-700'></div>
                    <div className='flex items-center justify-center gap-1'>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className='flex-1 md:flex-none md:w-[109.5px] h-[50px] sm:h-16 rounded-xl bg-bg-dark-700 light:bg-bg-light-700'></div>
                        ))}
                    </div>
                </>
            )}

            {moviesData.length > 0 && (
                <>
                    <Swiper
                        spaceBetween={0}
                        centeredSlides={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: true,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                        className="mySwiper2 rounded-xl overflow-hidden"
                    >
                        {moviesData.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                {
                                    !movie.backdrop_path ?
                                        <div className='section_movie_detail_image_backup flex flex-col items-center justify-center pb-16 h-[270px] sm:h-[400px] md:h-[500px] lg:h-[640px] mx-auto bg-bg-dark-700 light:bg-bg-light-700 rounded-xl'>
                                            <p className='text-center text-sm md:text-base text-text-dark-500 light:text-text-light-600'>Poster is not found</p>
                                        </div>
                                        :
                                        <div className='relative w-full h-full'>
                                            <div className="absolute inset-0 bg-gradient-to-t to-transparent dark:from-black/90 dark:via-black/0" />
                                            <img className='w-full h-full object-contain' src={IMAGE_URL + movie.backdrop_path} loading='lazy' alt={movie.title} />
                                        </div>
                                }
                                <div className='absolute right-1/2 bottom-3 md:bottom-6 translate-x-1/2 flex flex-col gap-1.5 sm:gap-3 lg:gap-4 w-full'>
                                    <div className='flex items-center justify-center mx-auto w-[98%] sm:w-[80%] md:w-full'>
                                        <h1 onClick={() => nav(`/discover/${movie.id}`)} className='link_hover_hero text-xl sm:text-[22px] md:text-[26px] text-center lg:text-[28px] mx-auto text-text-dark-100 tracking-wide text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] cursor-pointer'>
                                            {movie.title}
                                        </h1>
                                    </div>
                                    <div className='mb-1 md:mb-0 flex items-center justify-center gap-2 text-[13px] sm:text-sm tracking-wide text-text-dark-100'>
                                        <p className='text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]'>{movie.release_date.slice(0, 4)}</p>
                                        <span className='text-xs leading-4'>•</span>
                                        <p className="line-clamp-1 flex items-center gap-1 flex-wrap">

                                            <span className='text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]'>
                                                {
                                                    getGenreNames(movie?.genre_ids[0])?.name
                                                }
                                            </span>
                                        </p>
                                        <span className='text-xs leading-4'>•</span>
                                        <p className='uppercase text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]'>{movie.original_language}</p>
                                        <span className='text-xs leading-4'>•</span>
                                        <p className='text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]'>{movie.adult ? "18+" : "6+"}</p>
                                    </div>
                                    <div className='items-center justify-center hidden md:flex'>
                                        <button onClick={() => nav(`/discover/${movie.id}`)} className='sm:w-[270px] xl:w-[270px] sm:h-[44px] lg:h-[52px] shadow-2xl flex items-center justify-center gap-[7px] bg-text-dark-100 rounded-xl text-primary'>
                                            <RiPlayFill className='text-xl md:text-2xl' />
                                            <span className='tracking-wide text-base md:text-lg hidden sm:block'>Watch</span>
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={4}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper select-none"
                    >
                        {moviesData.map((movie) => (
                            <SwiperSlide key={movie.id} className='overflow-hidden rounded-xl cursor-pointer'>
                                <img className='w-full h-full object-contain hover:scale-105 duration-150 ease-out' src={movie.backdrop_path ? IMAGE_URL + movie.backdrop_path : fallbackImage} loading='lazy' />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )}
        </section>
    );
};

export default React.memo(Hero);
