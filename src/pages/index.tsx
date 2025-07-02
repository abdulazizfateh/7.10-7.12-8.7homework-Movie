import React, { lazy } from 'react'
import { useRoutes } from 'react-router-dom';
// Pages
const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./home/Home"));
const Discover = lazy(() => import("./discover/Discover"));

const AppRoutes = () => {
    return (
        useRoutes(
            [
                {
                    path: "/", element: <Layout />, children: [
                        {
                            path: "/", element: <Home />
                        },
                        {
                            path: "/discover", element: <Discover />
                        },
                        {
                            path: "/saved", element: "Saved"
                        },
                        {
                            path: "/search", element:"Search"
                        }
                    ]
                }
            ]
        )
    )
}

export default React.memo(AppRoutes);