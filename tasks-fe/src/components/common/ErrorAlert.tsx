import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { ErrorResponse } from '../../types';

interface ErrorAlertProps {
  error: ErrorResponse | null;
  onClose: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md w-full bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 rounded shadow-lg animate-slide-in">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-300" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error {error.status}</h3>
          <div className="mt-1 text-sm text-red-700 dark:text-red-300">
            <p>{error.message}</p>
            {error.details && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error.details}</p>}
          </div>
        </div>
        <button 
          onClick={onClose}
          className="ml-auto flex-shrink-0 text-red-500 dark:text-red-300 hover:text-red-700 dark:hover:text-red-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;