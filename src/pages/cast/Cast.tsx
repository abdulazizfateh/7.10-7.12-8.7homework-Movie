import React, { useEffect } from 'react'
import { usePerson } from '@/api/hooks/usePerson';
import MovieCard from '@/components/MovieCard/MovieCard';
import type { ICastDetail, IMovie } from '@/types/types';
import { useParams } from 'react-router-dom'
import { IMAGE_URL } from '@/const';
import { FaUser } from "react-icons/fa6";

const Cast = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const { id } = useParams();
    const { getPersonMovies, getPerson } = usePerson();
    const { data, isLoading } = getPersonMovies(id || "", "movie_credits");
    const castMoviesData: IMovie[] = data?.cast;
    const cardQuantity = data?.cast?.length || 30;

    const { data: castFullData, isLoading: isLoadingCast } = getPerson(id || "");
    const castData: ICastDetail = castFullData;

    return (
        <>
            <section className='section_cast_detail'>
                <div className="container">
                    <div className='cast_detail_wrapper min-h-screen grid grid-cols-1 xl:grid-cols-[2fr_8fr] gap-4 sm:gap-5 lg:gap-7 xl:gap-8 mt-4 sm:mt-6 md:mt-7 lg:mt-8'>
                        <div className='cast_detail_info xl:self-start xl:sticky xl:top-[20px]'>
                            <div className='max-w-[98%] mx-auto min-[440px]:max-w-[400px] xl:overflow-y-auto xl:pb-7 xl:h-screen xl:pr-1 xl:max-h-[calc(100vh] rounded-xl mb-12 xl:mb-0'>
                                <div className='mb-4 md:mb-6'>
                                    {
                                        isLoadingCast && <div className='bg-bg-dark-700 light:bg-bg-light-700 w-[80%] min-[360px]:w-[60%] min-[440px]:w-auto mx-auto xl:w-full object-cover h-80 lg:h-[350px] rounded-xl'></div>
                                    }
                                    {
                                        !isLoadingCast && castData.profile_path
                                            ?
                                            <img className='w-auto mx-auto xl:w-full object-cover h-80 lg:h-[350px] rounded-xl' src={IMAGE_URL + castData?.profile_path} alt={castData?.profile_path} />
                                            : !isLoadingCast ?
                                                <FaUser className='light:text-bg-light-900 text-[#bbb] h-80 lg:h-[350px] w-[80%] min-[360px]:w-[60%] min-[440px]:w-auto mx-auto xl:w-full rounded-xl' />
                                                : ""
                                    }
                                </div>
                                <h3 className='text-text-dark-100 light:text-text-light-100 text-lg tracking-wide md:text-xl lg:leading-6 mb-4 md:mb-6'>Personal info</h3>
                                <div className='flex flex-col gap-2 sm:gap-4 text-text-dark-500 text-sm tracking-wide md:text-base leading-5 pb-7 md:pb-8 border-b border-[#2D2D2D] light:border-bg-light-800'>
                                    <div className='flex items-start justify-between'>
                                        <p className='text-left'>Full name:</p>
                                        <p className='text-right text-text-dark-100 light:text-text-light-100'>{castData?.name}</p>
                                    </div>
                                    <div className='flex items-start justify-between'>
                                        <p className='text-left'>Known for:</p>
                                        <p className='text-right text-text-dark-100 light:text-text-light-100'>{castData?.known_for_department}</p>
                                    </div>
                                    <div className='flex items-start justify-between'>
                                        <p className='text-left'>Movies:</p>
                                        <p className='text-right text-text-dark-100 light:text-text-light-100'>{castMoviesData?.length}</p>
                                    </div>
                                    <div className='flex items-start justify-between'>
                                        <p className='text-left'>Born:</p>
                                        <p className='text-right text-text-dark-100 light:text-text-light-100'>{castData?.birthday?.split("-")?.reverse()?.join(".")} <br /> {castData?.place_of_birth?.split(", ")?.slice(-2)?.join(", ")}</p>
                                    </div>
                                    {
                                        castData?.deathday && <div className='flex items-start justify-between'>
                                            <p className='text-left'>Died:</p>
                                            <p className='text-right text-text-dark-100 light:text-text-light-100'>{castData?.deathday}</p>
                                        </div>
                                    }
                                    <div className='flex items-start justify-between'>
                                        <p className='text-left'>Gender:</p>
                                        <p className='text-right text-text-dark-100 light:text-text-light-100'>{castData?.gender === 1 ? "Female" : castData?.gender === 2 ? "Male" : "Other/unknown"}</p>
                                    </div>
                                </div>
                                {
                                    castData?.biography
                                        ?
                                        <div className='pt-7 md:pt-[32px] pb-7 md:pb-8 border-b border-[#2D2D2D] light:border-bg-light-800'>
                                            <h3 className='text-text-dark-100 light:text-text-light-100 text-lg tracking-wide md:text-xl lg:leading-6 mb-4 md:mb-6'>Biography</h3>
                                            <div>
                                                <p className='text-text-dark-500 text-sm md:text-base leading-6'>{castData?.biography}</p>
                                            </div>
                                        </div>
                                        :
                                        ""
                                }
                            </div>
                        </div>
                        <div className='cast_detail_movies xl:overflow-y-auto xl:pl-1 pb-7'>
                            <h3 className='text-text-dark-100 light:text-text-light-100 text-lg tracking-wide md:text-xl lg:leading-6 mb-4 md:mb-6'>{castData?.name} Movies</h3>
                            <MovieCard data={castMoviesData} isLoading={isLoading} cardQuantity={cardQuantity} grid={4} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default React.memo(Cast);