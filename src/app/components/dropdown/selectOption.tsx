import React from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SelectOption = ({ value = "", active = false, updateValue, icon }:any) => {
  
  const handleChange = (e: any) => {
    e.preventDefault();
    updateValue(value);
  };
  
  if (!icon) {
    icon = (
      <FontAwesomeIcon
        icon={faAngleDown}
      />
    );
  }
  
  return (
    <li
      className="cursor-default hover:bg-[#3b5998] hover:text-white select-none relative py-2 pl-3 pr-9"
      onClick={handleChange}
    >
      <div className="flex items-center">
        <span className="ml-3 block font-normal truncate">{value}</span>
      </div>
      {active && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
          {icon}
        </span>
      )}
    </li>
  );
};

export default SelectOption
