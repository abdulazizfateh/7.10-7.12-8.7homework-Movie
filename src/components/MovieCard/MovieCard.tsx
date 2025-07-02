import React, { type FC } from 'react'
// Types
import type { IGenre, IMovie } from '@/types/types';
// IMG URL
import { IMAGE_URL } from '@/const';
// React Query
import { useGenre } from '@/api/hooks/useGenre';
// Icons
import { RiBookmarkLine } from "react-icons/ri";
import { FaImdb } from "react-icons/fa";

const LoadingMovieCard = ({ cardQuantity }: { cardQuantity: number }) => {
    const loadingCardData: string[] = Array(cardQuantity).fill("");
    return (
        <div className='movie_cards grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-5'>
            {
                loadingCardData.map((_, index) => (
                    <div key={index} className='flex flex-col gap-1.5 sm:gap-2'>
                        <div className='h-32 sm:h-40 bg-bg-dark-700 light:bg-bg-light-700 rounded-xl'></div>
                        <div className='flex flex-col gap-1'>
                            <div className='h-5 sm:h-6 w-5/6 bg-bg-dark-700 light:bg-bg-light-700 rounded-md'></div>
                            <div className='h-4 sm:h-5 w-2/3 bg-bg-dark-700 light:bg-bg-light-700 rounded-md'></div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

interface Props {
    data: undefined | IMovie[];
    isLoading: boolean;
}

const MovieCard: FC<Props> = ({ data: movieData, isLoading }) => {
    const { getGenre } = useGenre();
    const { data } = getGenre;
    const genresList: IGenre[] = data?.genres;

    const getGenreNames = (ids: number[]) => {
        if (!genresList) return [];
        return ids
            .map(id => genresList.find(genre => genre.id === id)?.name)
    };

    return (
        <>
            {
                isLoading && <LoadingMovieCard cardQuantity={12} />
            }
            <div className='movie_cards grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-5'>
                {
                    movieData?.map((movie) => (
                        <div key={movie.id} className='movie_card flex flex-col gap-1.5 sm:gap-2'>
                            <div className='movie_card_image rounded-xl overflow-hidden relative group'>
                                <img className='h-32 sm:h-40 w-full object-cover group-hover:scale-[1.015] duration-150 ease-out' src={IMAGE_URL + movie.backdrop_path} alt={movie.title} />
                                <button className='absolute top-2 right-2 bg-bg-dark-900/5 p-1.5 rounded-sm backdrop-blur-xs cursor-pointer'>
                                    <RiBookmarkLine className='text-lg text-[#eee]' />
                                </button>
                                <button className='absolute bottom-2 right-2 flex items-center gap-1'>
                                    <span className='text-xs'>{movie.vote_average}</span>
                                    <FaImdb className='text-[#f3b701] text-[32px]' />
                                </button>
                            </div>
                            <div className='movie_card_body flex-1 flex flex-col gap-1'>
                                <p className='text-sm sm:text-base md:text-lg tracking-wide text-text-dark-100 light:text-text-light-100 line-clamp-1'>{movie.title} - <span className='uppercase'>{movie.original_language}</span></p>
                                <div className='flex-1 flex items-start'>
                                    <p className="line-clamp-1 flex items-center gap-1 flex-wrap">
                                        {getGenreNames(movie.genre_ids.slice(0, 2)).map((genre, index) => (
                                            <span key={index} className="text-[13px] sm:text-sm leading-4 text-text-dark-600 tracking-wide">
                                                {genre}{getGenreNames(movie.genre_ids.slice(0, 2)).length === index + 1 ? "" : ","}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default React.memo(MovieCard);