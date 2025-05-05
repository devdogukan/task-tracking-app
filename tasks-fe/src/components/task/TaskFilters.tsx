import React from 'react';
import { TaskPriority, TaskStatus } from '../../types';

interface TaskFiltersProps {
  priorityFilter: TaskPriority | null;
  statusFilter: TaskStatus | null;
  onPriorityChange: (priority: TaskPriority | null) => void;
  onStatusChange: (status: TaskStatus | null) => void;
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ 
  priorityFilter, 
  statusFilter, 
  onPriorityChange, 
  onStatusChange 
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 p-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</h3>
        <div className="flex flex-wrap gap-2">
          <FilterButton 
            active={priorityFilter === null}
            onClick={() => onPriorityChange(null)}
          >
            All
          </FilterButton>
          <FilterButton 
            active={priorityFilter === TaskPriority.HIGH}
            onClick={() => onPriorityChange(TaskPriority.HIGH)}
            color="red"
          >
            High
          </FilterButton>
          <FilterButton 
            active={priorityFilter === TaskPriority.MEDIUM}
            onClick={() => onPriorityChange(TaskPriority.MEDIUM)}
            color="amber"
          >
            Medium
          </FilterButton>
          <FilterButton 
            active={priorityFilter === TaskPriority.LOW}
            onClick={() => onPriorityChange(TaskPriority.LOW)}
            color="blue"
          >
            Low
          </FilterButton>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 p-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</h3>
        <div className="flex flex-wrap gap-2">
          <FilterButton 
            active={statusFilter === null}
            onClick={() => onStatusChange(null)}
          >
            All
          </FilterButton>
          <FilterButton 
            active={statusFilter === TaskStatus.OPEN}
            onClick={() => onStatusChange(TaskStatus.OPEN)}
            color="blue"
          >
            Open
          </FilterButton>
          <FilterButton 
            active={statusFilter === TaskStatus.CLOSED}
            onClick={() => onStatusChange(TaskStatus.CLOSED)}
            color="green"
          >
            Closed
          </FilterButton>
        </div>
      </div>
    </div>
  );
};

interface FilterButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  color?: 'blue' | 'red' | 'green' | 'amber';
}

const FilterButton: React.FC<FilterButtonProps> = ({ children, active, onClick, color = 'blue' }) => {
  const getColorClasses = () => {
    if (!active) return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600';
    
    switch (color) {
      case 'red':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      case 'green':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'amber':
        return 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200';
      default:
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
    }
  };
  
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${getColorClasses()}`}
    >
      {children}
    </button>
  );
};

export default TaskFilters;