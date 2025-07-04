import React from 'react'
// React Query
import { useGenre } from '@/api/hooks/useGenre';
// Types
import type { IGenre } from '@/types/types';
// Params Genre
import { useParamsHook } from '@/hooks/useParamsHook';


const LoadingGenreList = ({ genreListLoading: length }: { genreListLoading: number }) => {
    const loadingGenreListData = Array(length).fill("");
    return (
        <div className='pb-4 md:pb-5 mt-4 sm:mt-6 md:mt-7 lg:mt-8 flex items-center gap-1 md:gap-2 flex-nowrap overflow-auto'>
            {
                loadingGenreListData?.map((_, index) => (
                    <div key={index} className='px-14 h-9 md:h-11 bg-bg-dark-700 light:bg-bg-light-700 rounded-xl text-nowrap'></div>
                ))
            }
        </div>
    )
}



const GenreList = () => {
    const { setParam, getParam, removeParam } = useParamsHook();
    const selectedGenre = getParam("genre");

    // Genre List
    const { getGenre } = useGenre();
    const { data, isLoading } = getGenre;
    const genreListData: IGenre[] = data?.genres;

    const handleGenre = (genre: IGenre) => {
        if (genre.id === 0) {
            removeParam("genre");
        } else {
            setParam("genre", genre.id.toString());
        }
    };

    return (
        <>
            <section className='section_genres'>
                <div className='container'>
                    {
                        isLoading ? <LoadingGenreList genreListLoading={10} /> :
                            <div className='pb-4 md:pb-5 mt-4 sm:mt-6 md:mt-7 lg:mt-8 flex items-center gap-1 md:gap-2 flex-nowrap overflow-auto'>
                                <div onClick={() => handleGenre({ id: 0, name: "All" })} className={`${selectedGenre === null ? "bg-primary" : "bg-bg-dark-700 light:bg-bg-light-700"} h-9 px-4 md:h-11 lg:px-5 cursor-pointer rounded-xl flex items-center justify-center select-none`}>
                                    <span className={`${selectedGenre === null ? "light:text-bg-light-900" : "light:text-text-light-100"} leading-5 text-text-dark-100 text-sm lg:text-base tracking-wide text-nowrap`}>All</span>
                                </div>
                                {
                                    genreListData?.map(genre => (
                                        <div onClick={() => handleGenre(genre)} key={genre.id} className={`${selectedGenre === genre.id.toString() ? "bg-primary" : "bg-bg-dark-700 light:bg-bg-light-700"} h-9 px-4 md:h-11 lg:px-5 cursor-pointer rounded-xl flex items-center justify-center select-none`}>
                                            <span className={`${selectedGenre === genre.id.toString() ? "light:text-bg-light-900" : "light:text-text-light-100"} leading-5 text-text-dark-100 text-sm lg:text-base tracking-wide text-nowrap`}>{genre.name}</span>
                                        </div>
                                    ))
                                }
                            </div>
                    }
                </div>
            </section>
        </>
    )
}

export default React.memo(GenreList);