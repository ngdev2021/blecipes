import { Search } from "lucide-react";
import { motion } from "framer-motion";

export const SearchBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-2xl"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-800 shadow-sm transition-shadow duration-200 placeholder:text-gray-400 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
        />
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>
    </motion.div>
  );
};