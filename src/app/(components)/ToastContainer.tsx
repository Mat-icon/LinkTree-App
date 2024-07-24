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
      className={`p-4 mb-4 rounded-md text-white flex items-center instrumental-sans text-xs ${variant === 'success' ? 'bg-black' : 'bg-red-500'}`}
    >
      <LinkIcon className='w-4 h-4 mr-2 text-gray-500'/>{message}
    </div>
  );
};

export default Toast;
