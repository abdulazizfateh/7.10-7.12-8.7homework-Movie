import React  from 'react'
import AppRoutes from "./pages/index";
import { CustomSuspense } from "@/utils/utils"
const App = () => {
  return (
    <>
      <CustomSuspense>
        <AppRoutes />
      </CustomSuspense>
    </>
  )
}

export default React.memo(App);