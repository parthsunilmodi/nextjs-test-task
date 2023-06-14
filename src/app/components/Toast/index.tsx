'use client'
import React, {useEffect, useState} from "react";

const Toast = ({error}: string) => {
  const [visible, setVisible] =  useState<boolean>(true)

  useEffect(() => {
      return () => {
        let timer1 = setTimeout(() => setVisible(true), 1000);
        clearTimeout(timer1);
      };
    }, []);

  return (
    visible &&
    <div id="toast-top-right"
         className="fixed duration-300 flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-white text-xl font-bold dark:divide-gray-700 space-x dark:bg-[#FF0000]"
         role="alert">
      <div className="text-sm font-normal">{error}</div>
    </div>
  )
};

export default Toast;