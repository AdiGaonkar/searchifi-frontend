import { motion } from "framer-motion";
import Navbar from "@/components/SearchifiMainpage/Navbar";
import Footer from "@/components/SearchifiMainpage/Footer";
import HeroSection from "@/components/SearchifiMainpage/HeroSection";
import FeaturedProjects from "@/components/SearchifiMainpage/FeaturedProjects";
import Howitwork from "./Howitwork";
import Featuressection from "@/components/SearchifiMainpage/Featuressection";
import Threecomponents from "@/components/SearchifiMainpage/Threecomponents";
import Endherosection from "@/components/SearchifiMainpage/Endherosection";
import Heroframer from "@/components/Heroframer";
const LogoCarousel = () => {
  const logos = [
    "WebWinder_x (1).png",
    "WebWinder_x (2).png",
    "WebWinder_x (3).png",
    "WebWinder_x (4).png",
    "WebWinder_x.png",
  ];

  const extendedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full overflow-hidden bg-none backdrop-blur-xs pb-10 -pt-10">
      <h1 className="ml-[43%] text-lg font-normal p-10 ">We are Trusted by</h1>
      <motion.div
        className="flex space-x-16"
        initial={{ opacity: 0, x: "0%" }}
        animate={{ opacity: 1, x: "-50%" }}
        transition={{
          opacity: { duration: 0.5 },
          x: {
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5,
          },
        }}
        style={{
          width: "fit-content",
          display: "flex",
          gap: "3rem",
        }}
      >
        {extendedLogos.map((logo, index) => (
          <motion.img
            key={`logo-${index}`}
            src={logo}
            alt={`Partner logo ${index + 1}`}
            className="h-24 object-contain"
            initial={{ opacity: 0.5 }}
            whileHover={{
              opacity: 1,
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <Featuressection/>
        <FeaturedProjects />
        <Threecomponents/>
        <Heroframer/>
        <Endherosection/>
        <Footer/>
      </main>
    </div>
  );
};

export default LandingPage;
