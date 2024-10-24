import { Outlet } from "react-router-dom"
import Header from "./Header"
import ScrollToTop from "./ScrollToTop"


const Layout = () => {
    return (
        <main className="App">
            <ScrollToTop />
            <Header />
            <Outlet />
        </main>
    )
}

export default Layout
