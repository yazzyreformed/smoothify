import Navbar from "./components/Navbar.jsx";
import PhotoHero from "./components/PhotoHero.jsx";
import SmoothieShowcase from "./components/SmoothieShowcase.jsx";
import SmoothiesGrid from "./components/SmoothiesGrid.jsx";
import SocialCorner from "./components/SocialCorner.jsx";
import GoogleReviews from "./components/GoogleReviews.jsx";
import About from "./components/About.jsx";
import Footer from "./components/Footer.jsx";
import ContactPage from "./components/ContactPage.jsx";
import { useRoute } from "./router.js";

export default function App() {
  const path = useRoute();
  const isContact = path === "/iletisim" || path === "/iletisim/";
  const isAbout = path === "/hakkimizda" || path === "/hakkimizda/";

  let view;
  if (isContact) {
    view = <ContactPage />;
  } else if (isAbout) {
    view = (
      <main>
        <About />
      </main>
    );
  } else {
    view = (
      <main>
        <PhotoHero />
        <SmoothieShowcase />
        <SmoothiesGrid />
        <SocialCorner />
        <GoogleReviews />
      </main>
    );
  }

  return (
    <>
      <Navbar />
      {view}
      <Footer />
    </>
  );
}
