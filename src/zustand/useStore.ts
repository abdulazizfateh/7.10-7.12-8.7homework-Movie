import type { IMovie } from '@/types/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


type Store = {
    saved: IMovie[] | [];
    toggleSaved: (payload: IMovie) => void
    auth: string | null,
    addAuth: (payload: string) => void
}

export const useStore = create<Store>()(
    persist(
        (set, get) => ({
            saved: [],
            auth: null,
            toggleSaved: (payload) => {
                const doesExist = get().saved.some(item => item.id === payload.id);
                if (!doesExist) {
                    set(state => ({ saved: [...state.saved, payload] }))
                } else {
                    set(state => ({ saved: state.saved.filter((item) => item.id !== payload.id) }))
                }
            },
            addAuth: (payload) => {
                set(() => ({ auth: payload }))
            },
        }),
        {
            name: "saved",
            skipHydration: false
        }
    )
)