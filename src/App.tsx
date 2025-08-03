import React, { useEffect } from 'react'
import AppRoutes from "./pages/index";
import { CustomSuspense } from "@/utils/utils"
import { useStore } from './zustand/useStore';
const App = () => {
  const { theme } = useStore();
  useEffect(() => {
    const root = document.documentElement
    if (theme) {
      root.classList.add("light")
    } else {
      root.classList.remove("light")
    }
  }, [theme])
  return (
    <>
      <CustomSuspense>
        <AppRoutes />
      </CustomSuspense>
    </>
  )
}

export default React.memo(App);