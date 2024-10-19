"use client";
import Image from "next/image";
import React, { useState } from "react";
import Arrow from "/public/images/icon-chevron-down.svg";
import { options } from "@/utils/options";

interface option {
  label: string;
  value: string;
}

const Dropdown = ({ setPlatform }: any) => {
  const [option, setOption] = useState<option>({
    label: "GitHub",
    value: "github",
  });
  const [open, setOpen] = useState<boolean>(false);

  const handleOptionClick = (option: option) => {
    setOption(option);
    setPlatform(option.value);
    setOpen(false);
  };

  return (
    <div className="relative full">
      <label
        htmlFor="platform"
        className="block text-[12px] text-gray-700 mb-1"
      >
        Platform
      </label>
      <div
        className="flex items-center justify-between px-4 py-3 outline outline-1 outline-outline rounded-lg cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {option && (
          <div className="flex items-center ">
            <Image
              src={`/images/icon-${option.value}.svg`}
              width={16}
              height={16}
              alt="icon"
            />
            <span className="ml-3 text-[16px]">{option.label}</span>
          </div>
        )}
        <div>
          <Arrow
            className={`w-4 pl-[2px] h-2 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
      {open && (
        <div className="absolute z-10 h-40 overflow-y-scroll w-full mt-2 bg-white border rounded-lg shadow-lg">
          {options.map((option) => {
            return (
              <div
                key={option.label}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                <Image
                  src={`/images/icon-${option.value}.svg`}
                  width={16}
                  height={16}
                  alt={option.label}
                />
                <span className="ml-2">{option.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
