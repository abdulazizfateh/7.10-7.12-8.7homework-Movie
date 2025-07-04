import { useMovies } from '@/api/hooks/useMovies';
import type { IMovieDetail } from '@/types/types';
import React from 'react'
import { useParams } from 'react-router-dom';
import iconIMDB from "@/assets/images/icon-imdb.svg"

const MovieDetail = () => {
    const { id } = useParams();
    const { getMovieDetail } = useMovies();
    const { data } = getMovieDetail(id || "");
    const detailMovieData: IMovieDetail = data;

    return (
        <div className='mt-8 md:mt-12'>
            <div className='flex items-center gap-2 sm:gap-3 lg:gap-5 my-8 md:my-12'>
                <div className='w-1/2 h-12 md:h-16 rounded-xl border border-bg-dark-700 light:border-bg-light-800 flex items-center justify-center gap-2 md:gap-3.5'>
                    <span className='!font-black tracking-wide text-base sm:text-lg md:text-xl leading-6 text-text-dark-100 light:text-text-light-100'>{detailMovieData?.vote_average?.toFixed(1)}</span>
                    <img className='w-9 sm:w-10 md:w-12' src={iconIMDB} alt="Icon IMDB" />
                </div>
                <div className='w-1/2 h-12 md:h-16 rounded-xl border border-bg-dark-700 light:border-bg-light-800 flex items-center justify-center'>
                    <p className='!font-black tracking-wide text-base sm:text-lg md:text-xl leading-6 text-text-dark-100 light:text-text-light-100'>{detailMovieData?.vote_count} <span className='!font-medium text-sm md:text-base text-text-dark-500'>votes</span></p>
                </div>
            </div>
            <h3 className='text-text-dark-100 light:text-text-light-100 text-base tracking-wide md:text-lg lg:text-xl lg:leading-6 mb-5 md:mb-6'>Details</h3>
            <div className='flex flex-col gap-4 text-text-dark-500 text-sm tracking-wide md:text-base leading-5 pb-7 md:pb-8 border-b border-[#2D2D2D] light:border-bg-light-800'>
                <div className='flex items-center justify-between'>
                    <p className='text-left'>Duration</p>
                    <p className='text-right'>{detailMovieData?.runtime}min</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-left'>Premiere</p>
                    <p className='text-right'>{detailMovieData?.release_date}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-left'>Genre</p>
                    <p className='text-right'>{detailMovieData?.genres?.[0]?.name}{detailMovieData?.genres?.[1] ? `, ` + detailMovieData?.genres?.[1]?.name : ""}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-left'>Production Countries</p>
                    <p className='text-right'>{detailMovieData?.production_countries?.[0]?.iso_3166_1}{detailMovieData?.production_countries?.[1] ? `, ` + detailMovieData?.production_countries?.[1]?.iso_3166_1 : ""}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-left'>Production Companies</p>
                    <p className='text-right'>{detailMovieData?.production_companies?.[0]?.name}{detailMovieData?.production_companies?.[1] ? `, ` + detailMovieData?.production_companies?.[1]?.name : ""}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-left'>Age limit</p>
                    <p className='text-right'>{detailMovieData?.adult ? "18+" : "6+"} </p>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-left'>Budget</p>
                    <p className='text-right'>{detailMovieData?.budget ? `$` + detailMovieData?.budget.toLocaleString() : "-"}</p>
                </div>
                <div className='flex items-center justify-between'>
                    <p className='text-left'>Revenue</p>
                    <p className='text-right'>{detailMovieData?.revenue ? `$` + detailMovieData?.revenue.toLocaleString() : "-"}</p>
                </div>
            </div>
            {
                detailMovieData?.overview ? <div className='pt-7 md:pt-[32px] pb-7 md:pb-8 border-b border-[#2D2D2D] light:border-bg-light-800'>
                    <h3 className='text-text-dark-100 light:text-text-light-100 text-base tracking-wide md:text-lg lg:text-xl lg:leading-6 mb-5 md:mb-6'>Plot</h3>
                    <div className='w-[90%]'>
                        <p className='text-text-dark-500 text-sm tracking-wide md:text-base leading-5'>{detailMovieData?.overview}</p>
                    </div>
                </div> : ""
            }

        </div>
    )
}

export default React.memo(MovieDetail);