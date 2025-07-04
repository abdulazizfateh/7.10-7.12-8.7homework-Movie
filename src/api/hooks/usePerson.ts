import { useQuery } from "@tanstack/react-query"
import { api } from "../api"

export const usePerson = () => {
    const getPersonMovies = (id: string, path: string) => useQuery({
        queryKey: ["person"],
        queryFn: () => api.get(`person/${id}/${path}`).then(res => res?.data)
    })
    const getPerson = (id: string) => useQuery({
        queryKey: ["person", id],
        queryFn: () => api.get(`person/${id}`).then(res => res?.data)
    })
    return { getPersonMovies, getPerson };
}