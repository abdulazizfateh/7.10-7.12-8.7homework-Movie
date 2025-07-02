import React, { useEffect, useState } from 'react'
// React Query
import { useMovies } from '@/api/hooks/useMovies';
// Components
import MovieCard from '@/components/MovieCard/MovieCard';
import GenreList from '@/components/genreList/GenreList';
// Antd
import { Pagination } from 'antd';
// CSS
import "./style.css";

const Discover = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const [page, setPage] = useState<number>(1);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

    // Genre Tab
    const { getMovies } = useMovies();
    const { data: selectedGenreFullData, isLoading } = getMovies(selectedGenre ? { page: page, with_genres: `${selectedGenre}`, without_genres: "18, 27, 36, 10749" } : { page: page, without_genres: "18, 27, 36, 10749" });
    const selectedGenreData = selectedGenreFullData?.results;

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

    return (
        <>
            <GenreList selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />
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