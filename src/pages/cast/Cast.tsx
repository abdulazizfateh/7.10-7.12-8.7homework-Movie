import React, { useEffect } from 'react'
import { usePerson } from '@/api/hooks/usePerson';
import MovieCard from '@/components/MovieCard/MovieCard';
import type { ICastDetail, IMovie } from '@/types/types';
import { useParams } from 'react-router-dom'
import { IMAGE_URL } from '@/const';

const Cast = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const { id } = useParams();
    const { getPersonMovies, getPerson } = usePerson();
    const { data, isLoading } = getPersonMovies(id || "", "movie_credits");
    const castMoviesData: IMovie[] = data?.cast;

    const { data: castFullData } = getPerson(id || "");
    const castData: ICastDetail = castFullData;
    console.log(castData);

    return (
        <>
            <section className='section_cast_detail'>
                <div className="container">
                    <div className='cast_detail_wrapper min-h-screen grid grid-cols-1 xl:grid-cols-[2fr_8fr]  gap-4 mt-4 sm:mt-6 md:mt-7 lg:mt-8'>
                        <div className='cast_detail_info xl:self-start xl:sticky xl:top-[15px]'>
                            <div className='xl:overflow-y-auto xl:pr-1 xl:max-h-[calc(100vh] rounded-xl sm:grid grid-cols-2 xl:grid-cols-none'>
                                <div className='mb-4 md:mb-6'>
                                    <img className='w-[80%] min-[360px]:w-[60%] min-[440px]:w-auto mx-auto xl:w-full object-cover h-80 lg:h-[350px] rounded-xl' src={IMAGE_URL + castData?.profile_path} alt={castData?.profile_path} />
                                </div>
                                <div className='flex flex-col gap-3 text-text-dark-500 tracking-wide leading-5 pb-7 md:pb-8 border-b border-[#2D2D2D]'>
                                    <div className='flex items-center justify-between gap-1'>
                                        <p className='text-left'>Full Name:</p>
                                        <p className='text-right'>{castData?.name}</p>
                                    </div>
                                    <div className='flex items-center justify-between gap-1'>
                                        <p className='text-left'>Known for:</p>
                                        <p className='text-right'>{castData?.known_for_department}</p>
                                    </div>
                                    <div className='flex items-center justify-between gap-1'>
                                        <p className='text-left'>Movies played:</p>
                                        <p className='text-right'>{castMoviesData?.length}</p>
                                    </div>
                                    <div className='flex items-center justify-between gap-1'>
                                        <p className='text-left'>Birthdate:</p>
                                        <p className='text-right'>{castData?.birthday}</p>
                                    </div>
                                    <div className='flex items-center justify-between gap-1'>
                                        <p className='text-left'>Place of birth:</p>
                                        <p className='text-right'>{castData?.place_of_birth}</p>
                                    </div>
                                    {
                                        castData?.deathday ?
                                            <div className='flex items-center justify-between gap-1'>
                                                <p className='text-left'>Deathday</p>
                                                <p className='text-right'>{castData?.deathday}</p>
                                            </div> : ""
                                    }
                                    <div className='flex items-center justify-between gap-1'>
                                        <p className='text-left'>Gender:</p>
                                        <p className='text-right'>{castData?.gender === 1 ? "Female" : castData?.gender === 2 ? "Male" : "Other/unknown"}</p>
                                    </div>
                                    <div className='flex flex-col gap-1.5'>
                                        <p className='text-left'>Biography:</p>
                                        <p className='text-left text-sm'>{castData?.biography}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='cast_detail_movies xl:overflow-y-auto xl:pl-1'>
                            <h3 className='text-text-dark-100 light:text-text-light-100 text-base tracking-wide md:text-lg lg:text-xl lg:leading-6 mb-5 md:mb-6'>{castData?.name} Movies</h3>
                            <MovieCard data={castMoviesData} isLoading={isLoading} cardQuantity={24} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default React.memo(Cast);