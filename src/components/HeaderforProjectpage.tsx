import { useEffect, useState } from 'react';
import { ArrowRight, Command } from 'lucide-react';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { Button } from './ui/button';
import Thesearchifiimg from './SearchifiMainpage/Thesearchifiimg';

export default function HeroSection() {

  return (
    <section
      id="home"
      className="relative bg-black text-white min-h-screen w-full flex px-4 sm:px-6 md:px-12 lg:px-16 items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 items-center pt-36 sm:pt-28 md:pt-20">
          <div className="space-y-7 w-full flex flex-col items-center text-center px-2 sm:px-6">
            {/* Removed motion.div */}
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full glass"></div>

            <div className="max-w-4xl sm:max-w-4l -ml-20 text-left lg:max-w-7xl mx-auto px-2 sm:px-0">
              <h1 className="text-8xl font-light -mt-40 tracking-tight leading-snug mb-4">
                <TextGenerateEffect words="Build. Share. Inspire. Together.." />
              </h1>

              {/* Plain paragraph now */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light mb-8 px-2">
                Discover real-world projects, share your own work, and connectx with developers<br />
                who are building the future—together.
              </p>

              {/* Plain buttons, no motion, no transition */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="w-full sm:w-auto button-gradient rounded-full px-7 py-5 text-sm bg-gradient-to-b from-violet-600 to-violet-950 text-white">
                  Learn More
                </Button>
                <Button
                  size="lg"
                  variant="link"
                  className="text-white text-sm sm:text-base font-light"
                >
                  Get in touch with us <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
