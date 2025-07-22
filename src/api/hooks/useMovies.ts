import { useQuery } from "@tanstack/react-query"
import { api } from "../api"

export const useMovies = () => {

    const getMovies = (params: { page: number | string | null, without_genres: string, with_genres?: string }) => useQuery({
        queryKey: ["movie", params],
        queryFn: () => api.get("discover/movie", { params }).then(res => res.data),
    })

    const getMovieDetail = (id: string) => useQuery({
        queryKey: ["movie", "detail", id],
        queryFn: () => api.get(`movie/${id}`).then(res => res.data),
    })

    const getAdditionalMovieDetail = (id: string, path: string) => useQuery({
        queryKey: ["movie", "additional", path, id],
        queryFn: () => api.get(`movie/${id}/${path}`).then(res => res.data),
    })

    const getMoviesBySearch = (params: { query: string, page: number }) => useQuery({
        queryKey: ["movie", "search", params],
        queryFn: () => api.get(`/search/movie`, { params }).then(res => res.data),
        enabled: !!params.query,
    })

    return { getMovies, getMovieDetail, getAdditionalMovieDetail, getMoviesBySearch }
}