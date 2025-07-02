import React, { type FC } from 'react'
// React Query
import { useGenre } from '@/api/hooks/useGenre';
// Types
import type { IGenre } from '@/types/types';

interface Props {
    selectedGenre: number | null,
    setSelectedGenre: React.Dispatch<React.SetStateAction<null | number>>;
}
const GenreList: FC<Props> = ({ selectedGenre, setSelectedGenre }) => {
    // Genre List
    const { getGenre } = useGenre();
    const { data } = getGenre;
    const genresData: IGenre[] = data?.genres;

    const handleGenre = (genre: IGenre) => {
        setSelectedGenre(genre.id === 0 ? null : genre.id);
    };
    return (
        <>
            <section className='section_genres'>
                <div className='container'>
                    <div className='pb-4 md:pb-5 mt-4 sm:mt-6 md:mt-7 lg:mt-8 flex items-center gap-1 md:gap-2 flex-nowrap overflow-auto'>
                        <div onClick={() => handleGenre({ id: 0, name: "All" })} className={`${selectedGenre === null ? "bg-primary" : "bg-bg-dark-800 light:bg-bg-light-700"} h-9 px-4 md:h-12 lg:px-8 cursor-pointer rounded-xl flex items-center justify-center`}>
                            <span className={`${selectedGenre == null ? "light:text-bg-light-900" : "light:text-text-light-100"} leading-5 text-text-dark-100 text-sm lg:text-base tracking-wide text-nowrap`}>All</span>
                        </div>
                        {
                            genresData?.map(genre => (
                                <div onClick={() => handleGenre(genre)} key={genre.id} className={`${selectedGenre === genre.id ? "bg-primary" : "bg-bg-dark-800 light:bg-bg-light-700"} h-9 px-4 md:h-12 lg:px-8 cursor-pointer rounded-xl flex items-center justify-center`}>
                                    <span className={`${selectedGenre === genre.id ? "light:text-bg-light-900" : "light:text-text-light-100"} leading-5 text-text-dark-100 text-sm lg:text-base tracking-wide text-nowrap`}>{genre.name}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default React.memo(GenreList);