'use client';
import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { setToast } from '../../../redux/slice/toast/toastSlice';

const Toast = () => {
  const dispatch = useAppDispatch();
  const { visible, message, type } = useAppSelector(state => state.toast);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (visible) {
      timer = setTimeout(() => {
        dispatch(setToast({ visible: false, message: '', type: '' }));
      }, 4000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [dispatch, visible]);

  useEffect(() => {
    getColor(type || '');
  }, [type]);

  const onClose = () => {
    dispatch(setToast({ visible: false, message: '', type: '' }));
    clearTimeout(timer);
  };

  const getColor = (toastType: string) => {
    switch (toastType) {
      case 'warning':
        setSelectedType('#f0ad4e');
        break;
      case 'error':
        setSelectedType('#FF0000');
        break;
      case 'success':
        setSelectedType('#4BB543');
        break;
      case 'info':
        setSelectedType('#0a8fff');
        break;
      default:
        setSelectedType('#FF0000');
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      id="toast-top-right"
      className={`fixed flex items-center justify-between w-[100%] max-w-xs p-4 space-x-4 shadow top-5 right-5 text-white text-xl font-bold dark:divide-gray-700 space-x`}
      style={{ backgroundColor: selectedType, zIndex: '11' }}
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