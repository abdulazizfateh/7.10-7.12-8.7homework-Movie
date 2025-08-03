import React, { useState, type FC } from 'react'
// Types
import type { IGenre, IMovie, IUser } from '@/types/types';
import { useNavigate } from 'react-router-dom';
// IMG URL
import { IMAGE_URL } from '@/const';
// React Query
import { useGenre } from '@/api/hooks/useGenre';
// Icons
import { RiBookmarkLine } from "react-icons/ri";
import { RiBookmarkFill } from "react-icons/ri";
import logo from "@/assets/images/logo-full.svg";
import { useStore } from '@/zustand/useStore';
import MoreInfoCard from './MoreInfoCard';

const LoadingMovieCard = ({ cardQuantity, grid }: { cardQuantity: number | undefined, grid: number | undefined }) => {
    const loadingCardData: string[] = Array(cardQuantity).fill("");
    return (
        <div className={`loading_movie_cards grid grid-cols-2 min-[640px]:grid-cols-3 min-[940px]:grid-cols-4 ${grid ? "xl:grid-cols-4" : "xl:grid-cols-5"} gap-y-7 gap-x-3`}>
            {
                loadingCardData.map((_, index) => (
                    <div key={index} className='flex flex-col gap-1.5 sm:gap-2 bg-bg-dark-800 light:bg-bg-light-700 overflow-hidden rounded-xl h-[324.5px] min-[440px]:h-[372.5px] min-[520px]:h-[404.5px] lg:h-[414px]'>
                        <div className='h-[240px] min-[440px]:h-[288px] min-[520px]:h-[320px] lg:h-[340px] bg-bg-dark-700 light:bg-bg-light-700'></div>
                        <div className='flex flex-col gap-1.5 pt-0 p-2 pb-3 lg:pb-4 lg:px-3'>
                            <div className='w-[95%] h-[22.5px] md:h-6 bg-bg-dark-700 light:bg-bg-light-700 rounded-lg'></div>
                            <div className='flex flex-col gap-1'>
                                <div className='w-[70%] h-4 bg-bg-dark-700 light:bg-bg-light-700 rounded-lg'></div>
                                <div className='flex items-center gap-2.5 lg:hidden'>
                                    <div className='w-[35%] h-4 bg-bg-dark-700 light:bg-bg-light-700 rounded-lg'></div>
                                    <div className='w-[35%] h-4 bg-bg-dark-700 light:bg-bg-light-700 rounded-lg'></div>
                                </div>
                            </div>
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
    cardQuantity: number
    grid?: number | undefined;
}
const MovieCard: FC<Props> = ({ data: movieData, isLoading, cardQuantity, grid }) => {
    const nav = useNavigate();
    const userInfo: IUser | null = JSON.parse(localStorage.getItem("user_info") || "null");

    const { getGenre } = useGenre();
    const { data } = getGenre;
    const genresListData: IGenre[] = data?.genres;

    const getGenreNames = (ids: number[]) => {
        if (!genresListData) return [];
        return ids?.map(id => genresListData.find(genre => genre.id === id)?.name)
    };

    // Zustand - Saved
    const { saved, toggleSaved } = useStore();
    const handleSaved = (movie: IMovie) => {
        if (userInfo) {
            toggleSaved(movie);
        } else {
            nav("/signup");
        }
    }

    // Mouse Over State
    const [moreInfo, setMoreInfo] = useState<null | IMovie>(null);
    const handleMouseOverCard = (movie: IMovie) => {
        setMoreInfo(movie);
    }
    const handleMouseLeaveCard = () => {
        setMoreInfo(null);
    }

    const handleDetail = (id: number) => {
        nav(`/discover/${id}`)
    }

    return (
        <>
            {
                isLoading && <LoadingMovieCard cardQuantity={cardQuantity} grid={grid} />
            }
            <div className={`movie_cards grid grid-cols-2 min-[640px]:grid-cols-3 min-[940px]:grid-cols-4 ${grid ? "xl:grid-cols-4" : "xl:grid-cols-5"} gap-y-7 gap-x-2 sm:gap-x-3`}>
                {
                    movieData?.map((movie) => (
                        <div key={movie.id} onMouseLeave={handleMouseLeaveCard} onMouseOver={() => handleMouseOverCard(movie)} className='movie_card shadow-xl overflow-hidden rounded-xl bg-bg-dark-800 light:bg-bg-light-900 flex flex-col'>
                            <div className='movie_card_image relative group'>
                                {
                                    !movie.poster_path
                                        ? <div onClick={() => nav(`/discover/${movie.id}`)} className='h-60 min-[440px]:h-72 min-[520px]:h-[320px] lg:h-[340px] bg-bg-dark-700 light:bg-bg-light-700 rounded-xl flex flex-col gap-1 items-center justify-center text-sm md:text-base'>
                                            <img src={logo} alt="Logo" />
                                            <p className='text-center w-[90%] mx-auto text-text-dark-500 text-xs md:text-sm'>Poster is not available</p>
                                        </div>
                                        : <img onClick={() => nav(`/discover/${movie.id}`)} className='h-60 min-[440px]:h-72 min-[520px]:h-[320px] lg:h-[340px] w-full object-cover group-hover:scale-[1.01] duration-200 ease-out cursor-pointer' src={IMAGE_URL + movie.poster_path} alt={movie.title} />
                                }
                                <button onClick={(e) => {
                                    e.stopPropagation()
                                    handleSaved(movie)
                                }} className='absolute top-2 right-2 bg-bg-dark-900/20 p-1 md:hidden rounded-sm backdrop-blur-xs cursor-pointer'>
                                    {
                                        saved.some(item => item.id === movie.id) ? <RiBookmarkFill className='text-bg-light-700 text-xl md:text-2xl' /> : <RiBookmarkLine className='text-bg-light-700 text-xl md:text-2xl' />
                                    }
                                </button>
                                <div onClick={() => handleDetail(movie?.id)} className={`absolute ${moreInfo?.id === movie?.id ? "opacity-100" : "opacity-0"} w-full hidden duration-300 lg:flex bottom-[-2px] bg-bg-dark-700/40 backdrop-blur-[3px] py-3 p-2`}>
                                    <div className={`${moreInfo?.id === movie?.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} duration-300 w-full flex items-center justify-between`}>
                                        <MoreInfoCard id={movie?.id} />
                                        <button onClick={(e) => {
                                            e.stopPropagation()
                                            handleSaved(movie)
                                        }} className='px-1 py-2'>
                                            {
                                                saved.some(item => item.id === movie.id) ? <RiBookmarkFill className='text-bg-light-700 text-xl' /> : <RiBookmarkLine className='text-bg-light-700 text-xl' />
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='movie_card_body flex-1 flex flex-col gap-1.5 p-2 pb-3 lg:pb-4 lg:px-3'>
                                <p className='text-[15px] md:!text-base tracking-wide text-text-dark-100 light:text-text-light-100 line-clamp-1'>{movie.title}</p>
                                <div className='flex-1 flex flex-col justify-end gap-1'>
                                    <p className="line-clamp-1 flex items-center gap-1 flex-wrap">
                                        {getGenreNames(movie?.genre_ids?.slice(0, 2))?.map((genre, index) => (
                                            <span key={index} className="text-[13px] sm:text-sm leading-4 text-text-dark-600 tracking-wide">
                                                {genre}{getGenreNames(movie?.genre_ids?.slice(0, 2))?.length === index + 1 ? "" : ","}
                                            </span>
                                        ))}
                                    </p>
                                    <div className='w-full flex items-center gap-2.5'>
                                        {
                                            movie?.vote_average
                                                ?
                                                <div className='flex items-center gap-1 text-xs !font-semibold lg:hidden light:text-text-light-100 text-text-dark-100'>
                                                    <span className='text-[#f3b701] !font-black'>IMDb:</span>
                                                    <span className=''>{movie?.vote_average?.toFixed(1)}</span>
                                                </div>
                                                : ""
                                        }
                                        {
                                            movie?.release_date
                                                ?
                                                <div className='flex items-center gap-1 text-xs !font-semibold lg:hidden light:text-text-light-100 text-text-dark-100'>
                                                    <span className='text-primary !font-black'>Year:</span>
                                                    <span className='text-text-dark-100 light:text-text-light-100 text-xs md:text-sm !font-semibold leading-3'>{movie?.release_date?.slice(0, 4)}</span>
                                                </div>
                                                : ""
                                        }
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