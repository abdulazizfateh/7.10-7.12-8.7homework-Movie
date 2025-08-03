import type { IMovie } from '@/types/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


type Store = {
    saved: IMovie[] | [];
    toggleSaved: (payload: IMovie) => void
    auth: string | null,
    addAuth: (payload: string) => void
    theme: boolean
    setTheme: () => void
}

export const useStore = create<Store>()(
    persist(
        (set, get) => ({
            saved: [],
            auth: null,
            theme: false,

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
            setTheme: () => {
                const currentTheme = get().theme
                const newTheme = !currentTheme
                set(() => ({ theme: newTheme }))

                const root = document.documentElement
                root.classList.toggle("light")
            },
        }),
        {
            name: "app-storage",
            skipHydration: false
        }
    )
)