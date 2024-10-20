import React from "react";
import UrlIcon from '/public/images/icon-link.svg';

interface InputProps {
  setOnChange?: ((url: string) => void | undefined) | undefined; // Function to set the URL
  classes?: string;              // Optional class name for styling
  errormessage?: string;         // Optional error message
}

const Input: React.FC<InputProps> = ({ setOnChange, classes = '', errormessage }) => {
  return (
    <div className="relative">
      <label htmlFor="link" className="block text-[12px] text-gray-700 mb-1">
        Link
      </label>
      <div className={`bg-white flex items-center px-4 py-3 outline outline-1 outline-outline rounded-lg ${classes}`}>
        <div>
          <UrlIcon />
        </div>
        <input
          // @ts-expect-error there will always be a value
          onChange={(e) => setOnChange(e?.target?.value)}
          className="ml-3 outline-none focus:outline-none w-full pr-20" // Add right padding to create space for error message
          type="text"
          placeholder="https://www.github.com"
        />
        {/* Error message container */}
        {errormessage && (
          <p className="absolute right-4 text-red-600 text-sm ">
            {errormessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
