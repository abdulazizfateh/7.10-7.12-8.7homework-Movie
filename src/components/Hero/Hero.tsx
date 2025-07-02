import React, { useEffect, useState } from 'react';
import { IMAGE_URL } from '@/const';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay, Pagination } from 'swiper/modules';
// Swiper CSS
import './style.css';
import 'swiper/swiper-bundle.css';
// React Query
import { useMovies } from '@/api/hooks/useMovies';
import { useGenre } from '@/api/hooks/useGenre';
import type { IGenre, IMovie } from '@/types/types';
// Icons
import { RiPlayFill } from "react-icons/ri";
import { GoSun } from "react-icons/go";
import { PiMoonLight } from "react-icons/pi";
// Swiper Type
import type { Swiper as SwiperType } from 'swiper';

export const Hero = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    const { getMovies } = useMovies();
    const { data, isLoading } = getMovies({ page: 4, without_genres: "18,36,27,10749" });

    const madagaskar: IMovie = data?.results?.slice(7, 8)[0];
    const moviesData: IMovie[] = data?.results?.slice(9, 19) || [];
    if (madagaskar) moviesData.unshift(madagaskar);

    const { getGenre } = useGenre();
    const { data: genreResult } = getGenre;
    const genresList: IGenre[] = genreResult?.genres || [];

    const getGenreNames = (ids: number[]) => {
        return ids.map(id => genresList.find(genre => genre.id === id)?.name).filter(Boolean);
    };

    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        <section className='section_hero max-w-[1360px] mx-auto w-full flex flex-col gap-2 p-0 md:px-8'>
            {isLoading && (
                <>
                    <div className='max-w-[1360px] h-[570px] sm:h-[640px] rounded-xl bg-bg-dark-700 light:bg-bg-light-700'></div>
                    <div className='flex items-center justify-center gap-1'>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className='w-[109.5px] h-16 rounded-xl bg-bg-dark-700 light:bg-bg-light-700'></div>
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
                        modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
                        className="mySwiper2 md:rounded-xl overflow-hidden"
                    >
                        {moviesData.map((movie) => (
                            <SwiperSlide key={movie.id} className='relative'>
                                <img className='w-full h-full object-contain' src={IMAGE_URL + movie.backdrop_path} loading='lazy' alt={movie.title} />
                                <button onClick={handleTheme} className='md:hidden absolute z-20 top-4 right-4 flex items-center justify-center gap-2 backdrop-blur-md bg-bg-dark-900/20 light:bg-bg-light-900/40 duration-150 ease-out size-9 rounded-xl'>
                                    {
                                        theme ? <PiMoonLight className="text-xl" /> : <GoSun className="text-xl" />
                                    }
                                </button>
                                <div className='absolute right-1/2 bottom-7 sm:bottom-6 translate-x-1/2 flex flex-col gap-4 w-full'>
                                    <h1 className='text-2xl md:text-3xl lg:text-[32px] w-[90%] sm:w-[80%] mx-auto md:w-full text-text-dark-100 tracking-wide text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]'>
                                        {movie.title}
                                    </h1>
                                    <div className='flex items-center justify-center gap-2 text-sm tracking-wide text-text-dark-100'>
                                        <p className='text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]'>{movie.release_date.slice(0, 4)}</p>
                                        <span className='text-xs leading-4'>•</span>
                                        <p className="line-clamp-1 flex items-center gap-1 flex-wrap">
                                            {getGenreNames(movie.genre_ids.slice(0, 1)).map((genre, index) => (
                                                <span key={index} className='text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]'>{genre}</span>
                                            ))}
                                        </p>
                                        <span className='text-xs leading-4'>•</span>
                                        <p className='uppercase text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]'>{movie.original_language}</p>
                                        <span className='text-xs leading-4'>•</span>
                                        <p className='text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]'>{movie.adult ? "18+" : "6+"}</p>
                                    </div>
                                    <div className='flex items-center justify-center'>
                                        <button className='w-[82%] min-[450px]:w-[380px] md:w-[380px] h-12 sm:h-[52px] flex items-center justify-center gap-[7px] bg-text-dark-100 rounded-xl text-primary'>
                                            <RiPlayFill className='text-2xl' />
                                            <span className='tracking-wide'>Watch</span>
                                        </button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {
                        !isMobile &&
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
                                    <img className='w-full h-full object-contain hover:scale-105 duration-150 ease-out' src={IMAGE_URL + movie.backdrop_path} loading='lazy' />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    }
                </>
            )}
        </section>
    );
};

export default React.memo(Hero);
