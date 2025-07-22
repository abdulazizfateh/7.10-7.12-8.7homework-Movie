import type { IMovie } from '@/types/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


type Store = {
    saved: IMovie[] | [];
    toggleSaved: (payload: IMovie) => void
}

export const useStore = create<Store>()(
    persist(
        (set, get) => ({
            saved: [],
            toggleSaved: (payload) => {
                const doesExist = get().saved.some(item => item.id === payload.id);
                if (!doesExist) {
                    set(state => ({ saved: [...state.saved, payload] }))
                } else {
                    set(state => ({ saved: state.saved.filter((item) => item.id !== payload.id) }))
                }
            }
        }),
        {
            name: "saved",
            skipHydration: false
        }
    )
)