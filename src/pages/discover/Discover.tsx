import React, { useEffect, useState } from 'react'
// React Query
import { useGenre } from '@/api/hooks/useGenre';
import { useMovies } from '@/api/hooks/useMovies';
// Types
import type { IGenre } from '@/types/types';
// Components
import MovieCard from '@/components/MovieCard/MovieCard';
// Antd
import { Pagination } from 'antd';
// CSS
import "./style.css";

const Discover = () => {
    const [page, setPage] = useState<number>(1);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    // Genre List
    const { getGenre } = useGenre();
    const { data } = getGenre;
    const genresData: IGenre[] = data?.genres;
    const { getMovies } = useMovies();

    // Genre Tab
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const { data: selectedGenreFullData, isLoading } = getMovies(selectedGenre ? { page: page, with_genres: `${selectedGenre}`, without_genres: "18, 27, 36, 10749" } : { page: page, without_genres: "18, 27, 36, 10749" });
    const selectedGenreData = selectedGenreFullData?.results;
    const handleGenre = (genre: IGenre) => {
        setSelectedGenre(genre.id === 0 ? null : genre.id);
    };

    // 
    const handleChange = (page: number) => {
        window.scrollTo(0, 0);
        setPage(page)
    }

    useEffect(() => {
        setPage(1);
    }, [selectedGenre])


    // Pagination Responsive for Mobile
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    console.log(selectedGenre);



    return (
        <>
            <section className='section_genres'>
                <div className='container'>
                    <div className='pb-4 md:pb-5 my-4 sm:my-6 md:my-7 lg:my-8 flex items-center gap-2 flex-nowrap overflow-auto'>
                        <div onClick={() => handleGenre({ id: 0, name: "All" })} className={`${selectedGenre === null ? "bg-primary" : "bg-bg-dark-800 light:bg-bg-light-700"} h-11 md:h-12 px-6 lg:px-8 cursor-pointer rounded-xl flex items-center justify-center`}>
                            <span className={`${selectedGenre == null ? "light:text-bg-light-900" : "light:text-text-light-100"} leading-5 text-text-dark-100 text-sm lg:text-base tracking-wide text-nowrap`}>All</span>
                        </div>
                        {
                            genresData?.map(genre => (
                                <div onClick={() => handleGenre(genre)} key={genre.id} className={`${selectedGenre === genre.id ? "bg-primary" : "bg-bg-dark-800 light:bg-bg-light-700"} h-11 md:h-12 px-6 lg:px-8 cursor-pointer rounded-xl flex items-center justify-center`}>
                                    <span className={`${selectedGenre === genre.id ? "light:text-bg-light-900" : "light:text-text-light-100"} leading-5 text-text-dark-100 text-sm lg:text-base tracking-wide text-nowrap`}>{genre.name}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className='section_movies'>
                <div className="container">
                    <div className="movies_wrapper">
                        {
                            selectedGenreData?.length <= 0 ? <div className='min-h-[75vh] flex items-center justify-center text-text-dark-100 light:text-text-light-100 tracking-wide'>No matched data found</div> : <MovieCard data={selectedGenreData} isLoading={isLoading} />
                        }
                    </div>
                </div>
                {

                    selectedGenreData?.length <= 0 ? <></> :
                        <div className='flex items-center justify-center mt-12'>
                            <Pagination
                                className='custom-pagination !gap-1 sm:!gap-0'
                                pageSize={20}
                                current={page}
                                total={selectedGenreFullData?.total_results}
                                onChange={handleChange}
                                showSizeChanger={false}
                                showLessItems={isMobile}
                                responsive
                            />
                        </div>
                }
            </section>
        </>
    )
}

export default React.memo(Discover);