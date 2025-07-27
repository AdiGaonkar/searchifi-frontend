import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { Button } from '../ui/button';

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <section
        id="home"
        className="relative bg-white min-h-screen w-full flex px-4 sm:px-6 md:px-12 lg:px-16 items-center justify-center overflow-hidden"
      >
        {/* ✅ 3D grid pattern background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(#7c3aed22 1px, transparent 10px), repeating-linear-gradient(90deg, #7c3aed22 1px, transparent 10px)',
            transform: 'perspective(800px) rotateX(60deg)',
            transformOrigin: 'bottom',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Violet shadow from top */}
        <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none z-30 bg-gradient-to-t from-violet-700/50 to-transparent" />

        {/* Main content */}
        <div className="relative z-10 w-full">
          <div className="grid grid-cols-1 items-center pt-36 sm:pt-28 md:pt-20">
            <div className="space-y-7 w-full flex flex-col items-center text-center text-black px-2 sm:px-6">

              <div className="max-w-3xl sm:max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-0">
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-snug sm:leading-tight text-gray-800 mb-4">
                  <TextGenerateEffect words="Start your Programming Journey Now!" />
                </h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl font-light text-gray-700 mb-8 px-2"
                >
                  Join thousands of learners building their dream tech careers with modern, hands-on resources.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 items-center justify-center"
                >
                  <Button className="w-full sm:w-auto button-gradient rounded-full px-7 py-5 text-sm bg-gradient-to-b from-violet-600 to-violet-950 text-white hover:opacity-80 transition-all duration-150 hover:scale-95">
                    Get Started
                  </Button>
                  <Button
                    size="lg"
                    variant="link"
                    className="text-black text-sm sm:text-base"
                  >
                    Get in touch with us <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
