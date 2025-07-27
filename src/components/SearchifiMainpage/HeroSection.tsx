import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Command } from 'lucide-react';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { Button } from '../ui/button';
import Thesearchifiimg from './Thesearchifiimg';

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <section
        id="home"
        className="relative bg-black min-h-screen w-full text-white flex px-4 sm:px-6 md:px-12 lg:px-16 items-center justify-center overflow-hidden"
      >
        {/* Background Video */}
        {/* Violet shadow from top */}
        <div className="absolute top-0 left-0 w-full h-40 pointer-events-none z-30 bg-gradient-to-b from-violet-700/50 to-transparent" />

        {/* Optional: Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-black/60 z-0" />

        {/* Hero Content */}
        <div className="relative z-10 w-full">
          <div className="grid grid-cols-1 items-center pt-36 sm:pt-28 md:pt-20">
            <div className="space-y-7 w-full flex flex-col items-center text-center px-2 sm:px-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-4 px-4 py-1.5 rounded-full glass"
              >
                <span className="text-xs sm:text-sm font-light border border-black p-1 px-4 rounded-full flex items-center gap-2">
                  <Command className="w-4 h-4" />
                  TheSearchifi - Developers Hub
                </span>
              </motion.div>

              <div className="max-w-3xl sm:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-0">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-snug sm:leading-tight text-white mb-4">
                  <TextGenerateEffect words="Where developers meet to build, share, and grow." />
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl font-light mb-8 px-2"
                >
                  Showcase your work, discover unique ideas, and collaborate with creators worldwide.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 items-center justify-center"
                >
                  <Button className="w-full sm:w-auto button-gradient rounded-full px-7 py-5 text-sm bg-gradient-to-b from-violet-600 to-violet-950 text-white hover:opacity-80 transition-all duration-150 hover:scale-95">
                    Learn More
                  </Button>
                  <Button
                    size="lg"
                    variant="link"
                    className="text-white text-sm sm:text-base"
                  >
                    Get in touch with us <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Image or Showcase Section */}
      <Thesearchifiimg />
    </>
  );
}
