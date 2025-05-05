import React from 'react';
import { Edit, Trash2, ChevronRight } from 'lucide-react';
import { TaskListDto } from '../../types';
import ProgressBar from '../common/ProgressBar';

interface TaskListCardProps {
  taskList: TaskListDto;
  onView: (id: string) => void;
  onEdit: (taskList: TaskListDto) => void;
  onDelete: (id: string) => void;
}

const TaskListCard: React.FC<TaskListCardProps> = ({ taskList, onView, onEdit, onDelete }) => {
  const handleView = () => {
    if (taskList.id) onView(taskList.id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md group">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{taskList.title}</h3>
          <div className="flex space-x-1">
            <button 
              onClick={() => onEdit(taskList)} 
              className="p-1 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              aria-label="Edit task list"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button 
              onClick={() => taskList.id && onDelete(taskList.id)} 
              className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
              aria-label="Delete task list"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {taskList.description || 'No description'}
        </p>
        
        <div className="mt-4">
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{!isNaN(Number(taskList.progress)) ? Math.round(Number(taskList.progress) * 100) : 0}%</span>
          </div>
          <ProgressBar value={taskList.progress || 0} total={1} />
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {taskList.count || 0} tasks
          </div>
          <button 
            onClick={handleView}
            className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            View Tasks <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskListCard;