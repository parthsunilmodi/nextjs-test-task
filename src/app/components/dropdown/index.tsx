import React, { useState } from 'react';
import SelectOption from './selectOption';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';

export const Select = (
  {
    name = "customSelect",
    value = "-- Select Option --",
    options = [],
    icon
  }: any) => {
  const [ state, setState ] = useState({
    value,
    showOptions: false
  });
  
  const handleClick = (e:any) => {
    e.preventDefault();
    setState((p) => ({...p, showOptions: !state.showOptions}));
  };
  
  const updateValue = (value: any) => {
    setState((p) => ({...p, showOptions: false, value}));
  };
  
  if (!icon) {
    icon = (
      <FontAwesomeIcon
        icon={faAngleDown}
      />
    );
  }
  
  return (
    <div className="mt-1 relative">
      <input type="hidden" name={name} value={state.value}/>
      <button
        type="button"
        className={
          state.showOptions
            ? "transition transition-all relative w-full bg-white rounded-md shadow-lg pl-3 pr-10 py-3 text-left cursor-default outline-none ring-1 ring-indigo-500 border-indigo-500 sm:text-sm"
            : "transition transition-all relative w-full bg-white rounded-md shadow-lg pl-3 pr-10 py-3 text-left cursor-default sm:text-sm"
        }
        onClick={handleClick}
      >
        <span className="flex items-center">
          <span className="ml-3 block truncate">{state.value}</span>
        </span>
        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          {icon}
        </span>
      </button>
      {state.showOptions && (
        <div className="absolute mt-1 w-full z-10 rounded-md bg-white shadow-lg">
          <ul
            className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {options.map((option:string, idx: number) => (
              <SelectOption
                key={idx}
                value={option}
                active={false}
                updateValue={updateValue}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
