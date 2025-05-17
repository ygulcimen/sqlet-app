import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const SearchableSelect = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Select...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef();
  const justToggledRef = useRef(false);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setQuery("");
  };

  useEffect(() => {
    const closeOnClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnClickOutside);
    return () => document.removeEventListener("mousedown", closeOnClickOutside);
  }, []);

  return (
    <div className="mb-3" ref={containerRef}>
      {label && (
        <label className="block text-sm mb-1 text-gray-300">{label}</label>
      )}
      <div className="relative">
        <input
          type="text"
          className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded outline-none pr-10"
          placeholder={placeholder}
          value={isOpen ? query : value}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (!justToggledRef.current) setIsOpen(true);
            justToggledRef.current = false;
          }}
        />
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          onClick={() => {
            justToggledRef.current = true;
            setIsOpen((prev) => !prev);
            setQuery("");
          }}
        >
          <FaChevronDown size={12} />
        </div>

        {isOpen && (
          <ul className="absolute z-20 w-full max-h-48 overflow-y-auto bg-gray-900 border border-gray-700 rounded-b shadow-md mt-1">
            {filtered.length > 0 ? (
              filtered.map((option, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(option)}
                  className="px-3 py-2 cursor-pointer hover:bg-green-600 hover:text-white text-gray-200"
                >
                  {option}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-400 italic">No match</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchableSelect;
