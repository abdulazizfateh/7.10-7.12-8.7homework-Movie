import { useQuery } from "@tanstack/react-query"
import { api } from "../api"

export const useMovies = () => {

    const getMovies = (params: any) => useQuery({
        queryKey: ["movie", params],
        queryFn: () => api.get("discover/movie", { params }).then(res => res.data)
    })

    const getMovieDetail = (id: string) => useQuery({
        queryKey: ["movie", id],
        queryFn: () => api.get(`movie/${id}`).then(res => res.data)
    })

    const getAdditionalMovieDetail = (id: string, path: string) => useQuery({
        queryKey: ["movie", path, id],
        queryFn: () => api.get(`movie/${id}/${path}`).then(res => res.data),
    })

    return { getMovies, getMovieDetail, getAdditionalMovieDetail }
}