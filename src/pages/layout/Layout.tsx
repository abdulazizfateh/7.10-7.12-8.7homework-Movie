import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
// Layout - Header/Footer
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const Layout = () => {
    const location = useLocation();
    return (
        <>
            <Header />
            <main className='site_main mb-20'>
                <Outlet />
            </main>
            {
                location.pathname.slice(0, 7) === "/search" ? "" : <Footer />
            }
        </>
    )
}

export default React.memo(Layout);