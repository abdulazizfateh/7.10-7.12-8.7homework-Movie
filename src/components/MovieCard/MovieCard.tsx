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
import { FaImdb } from "react-icons/fa";
import logo from "@/assets/images/logo-full.svg";
import { useStore } from '@/zustand/useStore';
// CSS
import "./style.css"


const LoadingMovieCard = ({ cardQuantity, grid }: { cardQuantity: number | undefined, grid: number | undefined }) => {
    const loadingCardData: string[] = Array(cardQuantity).fill("");
    return (
        <div className={`loading_movie_cards grid grid-cols-2 min-[640px]:grid-cols-3 min-[940px]:grid-cols-4 ${grid ? "xl:grid-cols-4" : "xl:grid-cols-5"} gap-y-7 gap-x-3`}>
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
    cardQuantity: number
    grid?: number | undefined;
}
const MovieCard: FC<Props> = ({ data: movieData, isLoading, cardQuantity, grid }) => {
    const nav = useNavigate();
    const userInfo: IUser | null = JSON.parse(localStorage.getItem("user_info") || "null");

    const { getGenre } = useGenre();
    const { data } = getGenre;
    const genresList: IGenre[] = data?.genres;

    const getGenreNames = (ids: number[]) => {
        if (!genresList) return [];
        return ids?.map(id => genresList.find(genre => genre.id === id)?.name)
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
    const [isMouseOver, setIsMouseOver] = useState<null | IMovie>(null);
    const [moreInfo, setMoreInfo] = useState<null | IMovie>(null);
    const handleMouseOverCard = (movie: IMovie) => {
        if (movie?.title?.length >= 28) {
            setIsMouseOver(movie);
        }
        setMoreInfo(movie);
    }

    const handleMouseLeaveCard = () => {
        setIsMouseOver(null);
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
            <div className={`movie_cards grid grid-cols-2 min-[640px]:grid-cols-3 min-[940px]:grid-cols-4 ${grid ? "xl:grid-cols-4" : "xl:grid-cols-5"} gap-y-7 gap-x-3`}>
                {
                    movieData?.map((movie) => (
                        <div key={movie.id} onMouseLeave={handleMouseLeaveCard} onMouseOver={() => handleMouseOverCard(movie)} className='movie_card flex flex-col gap-1.5 sm:gap-2'>
                            <div className='movie_card_image rounded-xl overflow-hidden relative group'>
                                {
                                    !movie.poster_path
                                        ? <div onClick={() => nav(`/discover/${movie.id}`)} className='h-64 min-[440px]:h-80 min-[520px]:h-[350px] lg:h-[400px] bg-bg-dark-700 light:bg-bg-light-700 rounded-xl flex flex-col gap-1 items-center justify-center text-sm md:text-base'>
                                            <img src={logo} alt="Logo" />
                                            <p className='text-center w-[90%] mx-auto text-text-dark-500 text-xs md:text-sm'>Poster is not available</p>
                                        </div>
                                        : <img onClick={() => nav(`/discover/${movie.id}`)} className='h-64 min-[440px]:h-80 min-[520px]:h-[350px] lg:h-[400px] w-full object-cover group-hover:scale-[1.01] duration-200 ease-out cursor-pointer' src={IMAGE_URL + movie.poster_path} alt={movie.title} />
                                }
                                <button onClick={(e) => {
                                    e.stopPropagation()
                                    handleSaved(movie)
                                }} className='absolute top-2 right-2 bg-bg-dark-900/20 p-1 md:hidden rounded-sm backdrop-blur-xs cursor-pointer'>
                                    {
                                        saved.some(item => item.id === movie.id) ? <RiBookmarkFill className='text-bg-light-700 text-xl md:text-2xl' /> : <RiBookmarkLine className='text-bg-light-700 text-xl md:text-2xl' />
                                    }
                                </button>
                                <div onClick={() => handleDetail(movie?.id)} className={`absolute ${moreInfo?.id === movie?.id ? "scale-100" : "scale-0"} hidden md:flex top-0 pt-2 px-2 w-full items-start justify-between`}>
                                    <div className='flex flex-col gap-1'>
                                        {
                                            movie?.release_date
                                                ?
                                                <div className='bg-primary w-10 h-5 md:w-12 md:h-7 rounded-sm flex items-center justify-center'>
                                                    <span className='text-text-dark-100 text-xs md:text-sm !font-semibold leading-3'>{movie?.release_date?.slice(0, 4)}</span>
                                                </div>
                                                :
                                                ""
                                        }
                                        {
                                            movie?.vote_average
                                                ?
                                                <button className='hidden lg:flex items-center gap-.5'>
                                                    <FaImdb className='text-[#f3b701] size-10' />
                                                    <span className='bg-[#f3b701] w-[35px] h-[35px] rounded-sm flex items-center justify-center text-sm md:text-base !font-semibold text-text-light-100'>{movie?.vote_average?.toFixed(1)}</span>
                                                </button>
                                                :
                                                ""
                                        }
                                    </div>
                                    <button onClick={(e) => {
                                        e.stopPropagation()
                                        handleSaved(movie)
                                    }} className='bg-bg-dark-900/20 p-1 rounded-sm backdrop-blur-xs cursor-pointer'>
                                        {
                                            saved.some(item => item.id === movie.id) ? <RiBookmarkFill className='text-bg-light-700 text-xl md:text-2xl' /> : <RiBookmarkLine className='text-bg-light-700 text-xl md:text-2xl' />
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className='movie_card_body overflow-hidden whitespace-nowrap flex-1 flex flex-col gap-1.5'>
                                <p className={`text-sm ${isMouseOver?.id === movie?.id ? "animate-marquee" : ""} sm:text-base md:text-lg tracking-wide text-text-dark-100 light:text-text-light-100`}>{movie.title} - <span className='uppercase'>{movie.original_language}</span></p>
                                <div className='flex-1 flex flex-col gap-1'>
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