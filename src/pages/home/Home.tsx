import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
// React Query
import { useMovies } from '@/api/hooks/useMovies';
// Components
import Hero from '@/components/Hero/Hero';
import MovieCard from '@/components/MovieCard/MovieCard';
// Icons
import { GrFormNext } from "react-icons/gr";

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const { getSpecificMovies } = useMovies();

    // Upcoming
    const { data: upcomingFullData, isLoading: isLoadingUpcoming } = getSpecificMovies("upcoming");
    const upcomingData = upcomingFullData?.results?.slice(0, window.innerWidth > 1280 ? 5 : window.innerWidth > 940 ? 4 : window.innerWidth > 640 ? 6 : 4);

    // Top Rated
    const { data: topRatedFullData, isLoading: isLoadingTopRated } = getSpecificMovies("top_rated");
    const topRatedData = topRatedFullData?.results?.slice(0, window.innerWidth > 1280 ? 5 : window.innerWidth > 940 ? 4 : window.innerWidth > 640 ? 6 : 4);

    // Popular
    const { data: popularFullData, isLoading: isLoadingPopular } = getSpecificMovies("popular");
    const popularData = popularFullData?.results?.slice(5, window.innerWidth > 1280 ? 10 : window.innerWidth > 940 ? 9 : window.innerWidth > 640 ? 11 : 9);

    // Currently In Theatres
    const { data: nowPlayingFullData, isLoading: isLoadingNowPlaying } = getSpecificMovies("now_playing");
    const nowPlayingData = nowPlayingFullData?.results?.slice(0, window.innerWidth > 1280 ? 5 : window.innerWidth > 940 ? 4 : window.innerWidth > 640 ? 6 : 4);


    return (
        <>
            <Hero />
            <section className='section_specific_movies mt-7 sm:mt-8 md:mt-9 lg:mt-[42px]'>
                <div className="container">
                    <div className='section_specific_movies flex flex-col gap-7 lg:gap-12'>
                        <div className='upcoming_movies_wrapper'>
                            <div className='flex items-center justify-between w-full mb-4'>
                                <h1 className='text-lg sm:text-xl leading-6 tracking-wide text-text-dark-100 light:text-text-light-100'>Upcoming</h1>
                                <Link to={"/discover"}
                                    className="flex items-center link_hover">
                                    <span className='text-sm sm:text-base'>Show all</span>
                                    <GrFormNext className='text-xl' />
                                </Link>
                            </div>
                            <MovieCard data={upcomingData} isLoading={isLoadingUpcoming} cardQuantity={window.innerWidth > 1280 ? 5 : window.innerWidth > 940 ? 4 : window.innerWidth > 640 ? 6 : 4} />
                        </div>
                        <div className='top_rated_movies_wrapper'>
                            <div className='flex items-center justify-between w-full mb-4'>
                                <h1 className='text-lg sm:text-xl leading-6 tracking-wide text-text-dark-100 light:text-text-light-100'>Top rated</h1>
                            </div>
                            <MovieCard data={topRatedData} isLoading={isLoadingTopRated} cardQuantity={window.innerWidth > 1280 ? 5 : window.innerWidth > 940 ? 4 : window.innerWidth > 640 ? 6 : 4} />
                        </div>
                        <div className='popular_movies_wrapper'>
                            <div className='flex items-center justify-between w-full mb-4'>
                                <h1 className='text-lg sm:text-xl leading-6 tracking-wide text-text-dark-100 light:text-text-light-100'>Popular</h1>
                            </div>
                            <MovieCard data={popularData} isLoading={isLoadingPopular} cardQuantity={window.innerWidth > 1280 ? 5 : window.innerWidth > 940 ? 4 : window.innerWidth > 640 ? 6 : 4} />
                        </div>
                        <div className='now_playing_movies_wrapper'>
                            <div className='flex items-center justify-between w-full mb-4'>
                                <h1 className='text-lg sm:text-xl leading-6 tracking-wide text-text-dark-100 light:text-text-light-100'>Now playing in theaters</h1>
                            </div>
                            <MovieCard data={nowPlayingData} isLoading={isLoadingNowPlaying} cardQuantity={window.innerWidth > 1280 ? 5 : window.innerWidth > 940 ? 4 : window.innerWidth > 640 ? 6 : 4} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default React.memo(Home);