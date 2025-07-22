import MovieCard from '@/components/MovieCard/MovieCard';
import { useMovies } from '@/api/hooks/useMovies';
import React, { useEffect, useState } from 'react'
// Icons
import { RiSearchLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
// Search
import useDebounce from '@/hooks/UseDebounceHook';
import { useParamsHook } from '@/hooks/useParamsHook';
import { Pagination } from 'antd';

const Search = () => {
    // Query Params
    const { setParam, getParam, removeParam } = useParamsHook();
    // Pagination
    const pageParam = getParam("page");
    const [page, setPage] = useState<string>(pageParam || "1");

    // Search Request
    const { getMoviesBySearch } = useMovies();


    const query = getParam("query");
    const [searchValue, setSearchValue] = useState<string>(query || "");
    // Debounced Search Value
    const debounceValue = useDebounce(searchValue, 500);

    const { data, isLoading } = getMoviesBySearch({ query: query ? query : debounceValue, page: Number(page) });
    const searchData = data;
    console.log(searchData);

    useEffect(() => {
        if (debounceValue) {
            setParam("query", debounceValue);
        }
    }, [debounceValue])

    const handleSearchClean = () => {
        setSearchValue("");
        removeParam("query");
        removeParam("page");
    }


    // Pagination
    const handleChange = (page: number) => {
        setPage(page.toString());
        setParam("page", page);
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page])

    // Pagination Responsive for Mobile
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className='section_search'>
            <div className="container">
                <div className="search_wrapper mt-4 mb-8 sm:mt-6 sm:mb-10 md:mt-8 md:mb-12 lg:mt-12 lg:mb-16 xl:mb-20 min-h-[70dvh]">
                    <div className='search_bar flex items-center justify-center'>
                        <div className='relative w-full sm:max-w-[380px]'>
                            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className='w-full sm:max-w-[380px] h-12 lg:h-14 pl-10 lg:pl-14 pr-12 rounded-xl tracking-wide bg-bg-dark-800 light:bg-bg-light-700 outline-none text-base md:text-lg placeholder:text-text-dark-500 placeholder:light:text-text-light-600' type="text" placeholder='Search' />
                            <RiSearchLine className='absolute select-none top-1/2 -translate-y-1/2 left-3 lg:left-[20px] text-lg lg:text-2xl text-primary' />
                            {
                                searchValue && <IoMdClose onClick={handleSearchClean} className='absolute top-1/2 -translate-y-1/2 right-3 lg:right-[20px] text-lg md:text-xl text-primary' />
                            }
                        </div>
                    </div>
                    <div className='search_movie_results mt-4 sm:mt-6 md:mt-8'>
                        <MovieCard data={searchData?.results} isLoading={isLoading} cardQuantity={20} />
                        {
                            searchData?.total_results ?
                                <div className='flex items-center justify-center mt-12'>
                                    <Pagination
                                        className='custom-pagination !gap-1 sm:!gap-0'
                                        pageSize={20}
                                        current={Number(page)}
                                        total={100}
                                        onChange={handleChange}
                                        showSizeChanger={false}
                                        showLessItems={isMobile}
                                        responsive
                                        showQuickJumper
                                    />
                                </div>
                                : ""
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default React.memo(Search);