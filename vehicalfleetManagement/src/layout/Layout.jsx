import {
  Outlet
} from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

function Layout() {
  return (
   <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
