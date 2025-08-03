import { useMovies } from '@/api/hooks/useMovies';
import { IMAGE_URL } from '@/const';
import type { IMovieCredit } from '@/types/types';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";

const CastMovieDetail = () => {
    const nav = useNavigate();
    const { id } = useParams();
    const { getAdditionalMovieDetail } = useMovies();
    const { data } = getAdditionalMovieDetail(id || "", "credits");
    const movieCastCrewData: IMovieCredit = data;
    const movieCastData = movieCastCrewData?.cast?.slice(0, 12);
    const movieCrewData = movieCastCrewData?.crew?.slice(0, 12);

    return (
        <>
            <div className='movie_detail_cast mt-8 md:mt-12'>
                <h3 className='text-text-dark-100 light:text-text-light-100 text-base tracking-wide md:text-lg lg:text-xl lg:leading-6 mb-5 md:mb-6'>Cast</h3>
                {
                    movieCastData?.length <= 0
                        ?
                        <div className='h-[200px] flex items-center justify-center'>No cast data found</div>
                        :
                        <div className='flex flex-col gap-6'>
                            <div className='min-h-[200px] grid grid-cols-3 gap-x-1.5 gap-y-3'>
                                {
                                    movieCastData?.map(cast => (
                                        <div key={cast.id}>
                                            {
                                                cast?.profile_path
                                                    ?
                                                    <div className='w-full h-32 md:h-40 object-cover overflow-hidden rounded-xl'>
                                                        <img onClick={() => nav(`/cast/${cast.id}`)} loading='lazy' className='w-full h-full object-cover duration-200 ease-out cursor-pointer hover:scale-[1.01]' src={IMAGE_URL + cast?.profile_path} alt={cast?.original_name} />
                                                    </div>
                                                    :
                                                    <div className='w-full h-32 md:h-40 light:bg-bg-light-800 bg-bg-dark-700 rounded-xl flex items-end justify-center'>
                                                        <FaUser className='w-full h-28 md:h-36 light:text-bg-light-900 text-[#bbb] object-cover rounded-xl hover:scale-[1.01] duration-200 ease-out cursor-pointer' />
                                                    </div>
                                            }
                                            <p onClick={() => nav(`/cast/${cast.id}`)} className='line-clamp-1 text-[13px] !font-bold mt-1 mb-.5 cursor-pointer'>{cast?.original_name}</p>
                                            <p className='line-clamp-1 text-[12px] sm:text-[13px] !font-normal'>{cast?.character}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <button className='w-full h-[44px] md:h-[52px] rounded-xl flex items-center justify-center bg-bg-dark-700 light:bg-bg-light-700'>
                                <span className='text-text-dark-100 light:text-text-light-100'>See all</span>
                            </button>
                        </div>
                }
                <h3 className='text-text-dark-100 light:text-text-light-100 text-base tracking-wide md:text-lg lg:text-xl lg:leading-6 mb-5 md:mb-6 mt-10 md:mt-14'>Crew</h3>
                {
                    movieCrewData?.length <= 0 || !movieCrewData
                        ?
                        <div className='h-[200px] flex items-center justify-center'>No crew data found</div>
                        :
                        <div className='flex flex-col gap-6'>
                            <div className='min-h-[200px] grid grid-cols-3 gap-x-1.5 gap-y-3'>
                                {
                                    movieCrewData?.map(cast => (
                                        <div key={cast.credit_id}>
                                            {
                                                cast?.profile_path
                                                    ?
                                                    <img loading='lazy' className='w-full h-32 md:h-40 object-cover rounded-xl hover:scale-[1.01] duration-200 ease-out' src={IMAGE_URL + cast?.profile_path} alt={cast?.original_name} />
                                                    :
                                                    <div className='w-full h-32 md:h-40 light:bg-bg-light-800 bg-bg-dark-700 rounded-xl flex items-end justify-center'>
                                                        <FaUser className='w-full h-28 md:h-36 light:text-bg-light-900 text-[#bbb] object-cover rounded-xl hover:scale-[1.01] duration-200 ease-out cursor-pointer' />
                                                    </div>
                                            }
                                            <p className='line-clamp-1 text-[13px] !font-bold mt-1 mb-.5'>{cast?.original_name}</p>
                                            <p className='line-clamp-1 text-[12px] sm:text-[13px] !font-normal'>{cast?.department}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <button className='w-full h-[44px] md:h-[52px] rounded-xl flex items-center justify-center bg-bg-dark-700 light:bg-bg-light-700'>
                                <span className='text-text-dark-100 light:text-text-light-100'>See all</span>
                            </button>
                        </div>
                }
            </div>
        </>
    )
}

export default React.memo(CastMovieDetail);