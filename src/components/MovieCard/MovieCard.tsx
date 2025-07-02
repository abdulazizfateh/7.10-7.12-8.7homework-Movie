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
        <div className='movie_cards grid grid-cols-2 min-[640px]:grid-cols-3 min-[880px]:grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-5'>
            {
                loadingCardData.map((_, index) => (
                    <div key={index} className='flex flex-col gap-1.5 sm:gap-2'>
                        <div className='h-64 min-[440px]:h-80 min-[520px]:h-[350px] lg:h-[400px] bg-bg-dark-700 light:bg-bg-light-700 rounded-xl'></div>
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
            <div className='movie_cards grid grid-cols-2 min-[640px]:grid-cols-3 min-[880px]:grid-cols-4 gap-x-2 gap-y-7 sm:gap-x-4'>
                {
                    movieData?.map((movie) => (
                        <div key={movie.id} className='movie_card flex flex-col gap-1.5 sm:gap-2'>
                            <div className='movie_card_image rounded-xl overflow-hidden relative group'>
                                <img className='h-64 min-[440px]:h-80 min-[520px]:h-[350px] lg:h-[400px] w-full object-cover group-hover:scale-[1.015] duration-150 ease-out' src={IMAGE_URL + movie.poster_path} alt={movie.title} />
                                <button className='absolute top-2.5 right-2.5 md:top-4 md:right-3 bg-bg-dark-900/20 p-1.5 rounded-sm backdrop-blur-xs cursor-pointer'>
                                    <RiBookmarkLine className='text-[#eee] text-base sm:text-lg md:text-xl' />
                                </button>
                                <div className='bg-primary rounded-sm w-12 h-7 flex items-center justify-center absolute top-2.5 left-2.5 md:top-4 md:left-3'>
                                    <span className='text-text-dark-100 text-sm leading-3'>{movie.release_date.slice(0, 4)}</span>
                                </div>
                                <button className='absolute top-10 left-2.5 md:top-12 md:right-3 items-center gap-.5 hidden lg:flex'>
                                    <FaImdb className='text-[#f3b701] text-[32px]' />
                                    <span className='bg-[#f3b701] h-7 px-1.5 rounded-sm flex items-center justify-center text-xs !font-semibold text-text-light-100'>{movie.vote_average}</span>
                                </button>
                            </div>
                            <div className='movie_card_body flex-1 flex flex-col gap-1.5'>
                                <p className='text-sm sm:text-base md:text-lg tracking-wide text-text-dark-100 light:text-text-light-100 line-clamp-1'>{movie.title} - <span className='uppercase'>{movie.original_language}</span></p>
                                <div className='flex-1 flex items-start justify-between gap-2'>
                                    <p className="line-clamp-1 flex items-center gap-1 flex-wrap">
                                        {getGenreNames(movie.genre_ids.slice(0, 2)).map((genre, index) => (
                                            <span key={index} className="text-[13px] sm:text-sm leading-4 text-text-dark-600 tracking-wide">
                                                {genre}{getGenreNames(movie.genre_ids.slice(0, 2)).length === index + 1 ? "" : ","}
                                            </span>
                                        ))}
                                    </p>
                                    <div className='flex items-center gap-1 text-xs !font-semibold lg:hidden light:text-text-light-100 text-text-dark-100'>
                                        <span className='text-[#f3b701]'>IMDb:</span>
                                        <span className=''>{movie.vote_average.toFixed(1)}</span>
                                    </div>
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