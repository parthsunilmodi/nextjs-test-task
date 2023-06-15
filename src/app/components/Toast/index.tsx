'use client';
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setToast } from '../../../redux/slice/toast/toastSlice';

let timer: any = null;

const Toast = () => {
  const dispatch = useAppDispatch();
  const { visible, message, type } = useAppSelector((state) => state.toast);

  console.log('visible : ', visible);

  useEffect(() => {
    timer = setTimeout(() => {
      dispatch(setToast({ visible: false, message: '', type: '' }));
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const onClose = () => {
    dispatch(setToast({ visible: false, message: '', type: '' }));
    timer.clearTimeout();
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      id="toast-top-right"
      style={{ zIndex: '11' }}
      className="fixed flex items-center justify-between w-[100%] max-w-xs p-4 space-x-4 shadow top-5 right-5 dark:text-white text-xl font-bold dark:divide-gray-700 space-x dark:bg-[#FF0000]"
      role="alert"
    >
      <div className="text-sm font-normal">{message || 'asd'}</div>
      <div className="close cursor-pointer" onClick={onClose}>
        &times;
      </div>
    </div>
  );
};

export default Toast;
