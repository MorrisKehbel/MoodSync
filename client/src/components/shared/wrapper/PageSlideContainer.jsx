import { motion } from "framer-motion";

export const PageSlideContainer = ({ children }) => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };
  return (
    <motion.main
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-24 pb-16 px-4 md:px-0 max-w-5xl mx-auto"
    >
      {children}
    </motion.main>
  );
};
