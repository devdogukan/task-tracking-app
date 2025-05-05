import React from 'react';
import { CheckCircle2, Clock, Edit, Trash2 } from 'lucide-react';
import { TaskDto, TaskPriority, TaskStatus } from '../../types';

interface TaskListProps {
  tasks: TaskDto[];
  onEdit: (task: TaskDto) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (task: TaskDto) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <Clock className="h-full w-full" />
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tasks</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Get started by creating a new task.
        </p>
      </div>
    );
  }

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">High</span>;
      case TaskPriority.MEDIUM:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">Medium</span>;
      case TaskPriority.LOW:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">Low</span>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dateString: string, status: TaskStatus) => {
    if (status === TaskStatus.CLOSED) return false;
    
    const dueDate = new Date(dateString);
    const today = new Date();
    
    // Remove time information for comparison
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    
    return dueDate < today;
  };

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {tasks.map(task => (
          <li key={task.id} className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${
            task.status === TaskStatus.CLOSED ? 'bg-gray-50 dark:bg-gray-750' : ''
          }`}>
            <div className="flex items-start">
              <div className="mr-3 flex-shrink-0 pt-0.5">
                <button
                  onClick={() => onToggleStatus(task)}
                  className={`h-5 w-5 rounded-full flex items-center justify-center transition-colors ${
                    task.status === TaskStatus.CLOSED 
                      ? 'text-green-500 hover:text-green-600' 
                      : 'text-gray-400 hover:text-gray-500'
                  }`}
                  aria-label={task.status === TaskStatus.CLOSED ? "Mark as open" : "Mark as closed"}
                >
                  <CheckCircle2 className="h-5 w-5" />
                </button>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className={`text-sm font-medium ${
                    task.status === TaskStatus.CLOSED
                      ? 'text-gray-500 dark:text-gray-400 line-through'
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {task.title}
                  </h3>
                  <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(task)}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                      aria-label="Edit task"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => task.id && onDelete(task.id)}
                      className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                      aria-label="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                {task.description && (
                  <p className={`text-sm text-gray-500 dark:text-gray-400 ${
                    task.status === TaskStatus.CLOSED ? 'line-through' : ''
                  }`}>
                    {task.description}
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(task.priority)}
                    <span className={`text-xs ${
                      isOverdue(task.dueDate, task.status)
                        ? 'text-red-600 dark:text-red-400 font-medium'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {isOverdue(task.dueDate, task.status) ? 'Overdue: ' : 'Due: '}
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;