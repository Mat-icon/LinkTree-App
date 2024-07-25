// components/Toast.tsx
import { LinkIcon } from '@heroicons/react/16/solid';
import React from 'react';

interface ToastProps {
  message: string;
  variant: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, variant }) => {
  return (
    <div
      className={`py-2 shadow-md shadow-gray-400 w-auto mb-4 rounded-xl text-white flex items-center instrumental-sans text-sm  justify-center ${variant === 'success' ? 'toas' : 'bg-red-500'}`}
    >
      <LinkIcon className='w-4 h-4 mr-2 text-gray-500'/>{message}
    </div>
  );
};

export default Toast;
