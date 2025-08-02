import React, { lazy } from 'react'
import { useRoutes } from 'react-router-dom';
// Pages
const Layout = lazy(() => import("./layout/Layout"));
const Home = lazy(() => import("./home/Home"));
const Discover = lazy(() => import("./discover/Discover"));
const DiscoverDetail = lazy(() => import("./discover/DiscoverDetail"));
const MovieDetail = lazy(() => import("@/components/MovieDetail/MovieDetail"));
const CastMovieDetail = lazy(() => import("@/components/CastCrewMovieDetail/CastCrewMovieDetail"));
const Cast = lazy(() => import("./cast/Cast"));
const Search = lazy(() => import("./search/Search"));
const Saved = lazy(() => import("./saved/Saved"));
const SignIn = lazy(() => import("./signup/SignUp"))

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
                            path: "/saved", element: <Saved />
                        },
                        {
                            path: "/search", element: <Search />
                        },
                        {
                            path: "/discover/:id", element: <DiscoverDetail />, children: [
                                {
                                    path: "", element: <MovieDetail />
                                },
                                {
                                    path: "cast", element: <CastMovieDetail />
                                }
                            ]
                        },
                        {
                            path: "/cast/:id", element: <Cast />
                        }
                    ]
                },
                {
                    path: "/signup", element: <SignIn />
                }

            ]
        )
    )
}

export default React.memo(AppRoutes);