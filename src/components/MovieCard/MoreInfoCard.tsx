import React from "react";
import { useMovies } from "@/api/hooks/useMovies";
import IconIMDb from "@/assets/images/icon-imdb.svg";
import type { IMovieDetail } from "@/types/types";
import { MdAccessTime } from "react-icons/md";

const MovieCardDetail = ({ id }: { id: number }) => {
    const { getMovieDetail } = useMovies();
    const { data } = getMovieDetail(String(id));
    const detailMovieData: IMovieDetail = data

    if (!data) return null;

    return (
        <div className='flex flex-col gap-4'>
            <p className='text-text-dark-100 text-xs md:text-sm !font-semibold leading-3'>
                {detailMovieData?.release_date?.slice(0, 4)}, {detailMovieData?.origin_country?.[0]}, {detailMovieData.adult ? "18+" : "6+"}, <span className="uppercase">{detailMovieData?.original_language}</span>
            </p>
            <div className='flex items-center gap-4'>
                <div className="hidden lg:flex items-center gap-1">
                    <img className='w-7' src={IconIMDb} alt="IMDb icon" />
                    <span className='text-xs md:text-sm !font-semibold leading-3 text-text-dark-100'>
                        {detailMovieData?.vote_average?.toFixed(1)}
                    </span>
                </div>
                <p className="flex items-center gap-[3px] text-xs md:text-sm !font-semibold leading-3 text-text-dark-100">
                    <MdAccessTime />
                    {detailMovieData?.runtime === 0 ? "0min" : Math.floor(detailMovieData?.runtime / 60) === 0 ? "" : Math.floor(detailMovieData?.runtime / 60) + "h"} {detailMovieData?.runtime % 60 === 0 ? "" : detailMovieData?.runtime % 60 + "min"}
                </p>
            </div>
        </div>
    );
};

export default React.memo(MovieCardDetail)

