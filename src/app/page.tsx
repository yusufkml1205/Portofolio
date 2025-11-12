import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import AboutMe from "../components/home/about-me";
import Contact from "../components/home/contact";
import EducationSkills from "../components/home/education-skills";
import ExperienceSec from "../components/home/experience-sec";
import HeroSection from "../components/home/hero-section";
import ContactBar from "../components/home/hero-section/contact-bar";
import LatestWork from "../components/home/latest-work";

export default function Home() {
  return (
    <>
      {/* HEADER HANYA DI HOME PAGE */}
      <Header />
      <main>
        <HeroSection />
        <ContactBar />
        <AboutMe />
        <ExperienceSec />
        <EducationSkills />
        <LatestWork />
        <Contact />
      </main>
      {/* FOOTER HANYA DI HOME PAGE */}
      <Footer />
    </>
  );
}
