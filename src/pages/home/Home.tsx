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
    const { getMovies } = useMovies();
    const data = getMovies({ page: 1, without_genres: "18, 10749" });

    const isLoading: boolean = data?.isLoading;
    const moviesData = data?.data?.results?.slice(0, 10);
    return (
        <>
            <Hero />
            <section className='section_trending_movies mt-7 sm:mt-8 md:mt-9 lg:mt-[42px]'>
                <div className="container">
                    <div className='trending_movies_wrapper'>
                        <div className='trending_movies_title_wrapper flex items-center justify-between w-full mb-4'>
                            <p className='text-base sm:text-xl leading-6 tracking-wide text-text-dark-100 light:text-text-light-100'>This week</p>
                            <Link to={"/discover"}
                                className="flex items-center link_hover">
                                <span className='text-sm sm:text-base'>Show all</span>
                                <GrFormNext className='text-xl' />
                            </Link>
                        </div>
                        <div className='trending_movies_cards_wrapper'>
                            <MovieCard data={moviesData} isLoading={isLoading} cardQuantity={12} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default React.memo(Home);