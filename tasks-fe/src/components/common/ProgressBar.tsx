import React from 'react';

interface ProgressBarProps {
  value: number;
  total?: number;
  size?: 'sm' | 'md' | 'lg';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, total = 100, size = 'md' }) => {
  const percentage = Math.min(Math.max(0, (value / total) * 100), 100);
  
  const getHeightClass = () => {
    switch (size) {
      case 'sm': return 'h-1.5';
      case 'lg': return 'h-3';
      default: return 'h-2';
    }
  };

  const getColorClass = () => {
    if (percentage < 30) return 'bg-red-500';
    if (percentage < 70) return 'bg-amber-500';
    return 'bg-green-500';
  };

  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${getHeightClass()}`}>
      <div 
        className={`${getColorClass()} h-full transition-all duration-300 ease-in-out`}
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
  );
};

export default ProgressBar;