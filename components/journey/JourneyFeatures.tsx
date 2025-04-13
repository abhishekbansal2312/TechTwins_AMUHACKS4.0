import React from "react";
import { motion } from "framer-motion";

const JourneyFeatures: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  return (
    <div className="py-24">
      <div id="demo" className="container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <motion.h2
            className="text-4xl font-bold mb-6 text-green-300"
            variants={fadeInUp}
          >
            Demo Video Here
          </motion.h2>
          <motion.div
            className="h-1 w-24 bg-green-500 mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 96, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-xl text-green-100 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Discover how our powerful system safeguards your personal
            information at every step
          </motion.p>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.div
            className="w-1/2 h-80 rounded-2xl overflow-hidden shadow-md transition-all duration-300 bg-gradient-to-br from-green-50 via-white to-green-100"
            variants={fadeInUp}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 20px 30px -10px rgba(34, 197, 94, 0.4)", // smooth green glow
            }}
          >
            <video
              className="w-full h-full object-cover"
              controls
              src="./demo.mp4"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default JourneyFeatures;
