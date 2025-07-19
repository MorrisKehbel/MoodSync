import { motion } from "framer-motion";

export const AnimatedButton = ({ children, onClick }) => {
  return (
    <div className="relative inline-block rounded-full p-[2px] overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 via-blue-500/40 to-pink-500/40"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 22 }}
        pointerEvents="none"
      />
      <motion.button
        onClick={onClick}
        type="button"
        aria-label="Open login dialog"
        style={{ backgroundSize: "200% 200%" }}
        initial={{ backgroundPosition: "0% 50%" }}
        whileHover={{
          backgroundPosition: "100% 50%",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.6 }}
        className="
          relative z-10
          px-6 py-2
          bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500
          text-white font-bold rounded-full shadow-lg
          focus:outline-offset-2 focus:outline-blue-600 cursor-pointer 
        "
      >
        {children}
      </motion.button>
    </div>
  );
};
