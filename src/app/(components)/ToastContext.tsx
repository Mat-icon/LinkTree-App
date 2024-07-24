'use client'
// components/ToastProvider.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import Toast from './ToastContainer'; // Adjust path as necessary

interface ToastContextProps {
  addToast: (message: string, variant: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<{ id: number; message: string; variant: 'success' | 'error' }[]>([]);
  const [nextId, setNextId] = useState(0);

  const addToast = (message: string, variant: 'success' | 'error') => {
    const id = nextId;
    setToasts((prevToasts) => [...prevToasts, { id, message, variant }]);
    setNextId(nextId + 1);

    // Remove the toast after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} variant={toast.variant} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
