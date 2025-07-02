import { useQuery } from "@tanstack/react-query"
import { api } from "../api"

export const useGenre = () => {
    const getGenre =
        useQuery(
            {
                queryKey: ["genre"],
                queryFn: () => api.get("genre/movie/list").then(res => res.data)
            }
        )
    return { getGenre };
}