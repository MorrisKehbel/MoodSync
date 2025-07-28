import { motion } from "framer-motion";

export const PageSlideContainer = ({ children }) => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-32 lg:pt-36 pb-12 px-4 md:px-8 max-w-5xl mx-auto w-full"
    >
      {children}
    </motion.div>
  );
};
