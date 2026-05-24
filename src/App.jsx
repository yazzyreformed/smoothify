import Navbar from "./components/Navbar.jsx";
import SmoothieShowcase from "./components/SmoothieShowcase.jsx";
import SmoothiesGrid from "./components/SmoothiesGrid.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <SmoothieShowcase />
        <SmoothiesGrid />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
