import React from 'react'
import { Outlet } from 'react-router-dom'
// Layout - Header/Footer
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import NavMobile from '@/components/navMobile/NavMobile';

const Layout = () => {
    return (
        <>
            <Header />
            <NavMobile />
            <main className='site_main'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default React.memo(Layout);