import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

export const SearchBar = ({ 
  onSearch,
  initialQuery = "" 
}: { 
  onSearch?: (query: string) => void;
  initialQuery?: string;
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (onSearch) {
        onSearch(query);
      } else {
        // If no onSearch prop is provided, navigate to recipes page with search query
        navigate(`/recipes?search=${encodeURIComponent(query)}`);
      }
    }, 300),
    [onSearch, navigate]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

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
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search recipes..."
          className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-800 shadow-sm transition-shadow duration-200 placeholder:text-gray-400 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
        />
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      </div>
    </motion.div>
  );
};