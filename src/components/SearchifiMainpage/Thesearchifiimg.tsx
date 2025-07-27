import React from 'react';
import { motion } from 'framer-motion';

const Fullstackimage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="relative mx-auto max-w-6xl pb-24"
    >
      <div className="glass rounded-xl mt-20 overflow-hidden">
        <video
          src="\Add a heading (1).mp4" // Replace with your actual video path
          autoPlay
          loop
          muted
          className="w-full h-auto"
        />
      </div>
    </motion.div>
  );
};

export default Fullstackimage;
