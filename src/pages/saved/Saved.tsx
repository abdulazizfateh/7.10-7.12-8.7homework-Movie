import React from 'react'
import MovieCard from '@/components/MovieCard/MovieCard';
import { useStore } from '@/zustand/useStore';
import { RiBookmarkFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Saved = () => {
    const { saved } = useStore();
    console.log(saved.length);

    return (
        <section className='section_saved'>
            <div className="container">
                <div className='saved_wrapper py-4 sm:py-6 lg:py-8'>
                    {
                        saved.length <= 0
                            ?
                            <div className='min-h-[75vh] flex items-center justify-center'>
                                <div className='flex flex-col items-center gap-3 w-full'>
                                    <RiBookmarkFill className='text-6xl md:text-7xl text-primary text-center' />
                                    <p className='w-[95%] sm:w-full mx-auto text-center mb-1 text-sm md:text-base text-text-dark-100 light:text-text-light-100'>Don’t lose your favorite movies. <br /> Save them here and access them anytime.</p>
                                    <Link to={"/discover"}>
                                        <button className='block bg-bg-dark-700 light:bg-bg-light-700 rounded-xl h-10 px-9 sm:h-11 sm:px-10 xl:h-12 xl:px-12 tracking-wide'>
                                            <span className="text-[15px] sm:text-base text-text-dark-100 light:text-text-light-100">Movies</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            :
                            <div className='min-h-[75vh]'>
                                <h1 className='text-base sm:text-xl leading-6 tracking-wide text-text-dark-100 light:text-text-light-100 mb-4 md:mb-6'>Saved</h1>
                                {
                                    <MovieCard data={saved} isLoading={false} cardQuantity={saved.length} />
                                }
                            </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default React.memo(Saved);