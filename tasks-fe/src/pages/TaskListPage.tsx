import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, PlusCircle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import TaskList from '../components/task/TaskList';
import TaskForm from '../components/task/TaskForm';
import TaskFilters from '../components/task/TaskFilters';
import ErrorAlert from '../components/common/ErrorAlert';
import ProgressBar from '../components/common/ProgressBar';
import { TaskDto, TaskListDto, ErrorResponse, TaskPriority, TaskStatus } from '../types';
import { 
  getTaskList, 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask
} from '../services/api';

const TaskListPage: React.FC = () => {
  const { taskListId } = useParams<{ taskListId: string }>();
  const navigate = useNavigate();
  
  const [taskList, setTaskList] = useState<TaskListDto | null>(null);
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<TaskDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskDto | undefined>(undefined);
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | null>(null);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | null>(null);
  
  useEffect(() => {
    if (taskListId) {
      loadTaskList();
      loadTasks();
    }
  }, [taskListId]);
  
  useEffect(() => {
    applyFilters();
  }, [tasks, priorityFilter, statusFilter]);
  
  const loadTaskList = async () => {
    if (!taskListId) return;
    
    try {
      const data = await getTaskList(taskListId);
      setTaskList(data);
      setError(null);
    } catch (err) {
      console.error('Error loading task list:', err);
      setError(err as ErrorResponse);
    }
  };
  
  const loadTasks = async () => {
    if (!taskListId) return;
    
    setIsLoading(true);
    try {
      const data = await getTasks(taskListId);
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError(err as ErrorResponse);
    } finally {
      setIsLoading(false);
    }
  };
  
  const applyFilters = () => {
    let filtered = [...tasks];
    
    if (priorityFilter !== null) {
      filtered = filtered.filter(task => task.priority === priorityFilter);
    }
    
    if (statusFilter !== null) {
      filtered = filtered.filter(task => task.status === statusFilter);
    }
    
    setFilteredTasks(filtered);
  };
  
  const handleAddTask = () => {
    setEditingTask(undefined);
    setShowForm(true);
  };
  
  const handleEditTask = (task: TaskDto) => {
    setEditingTask(task);
    setShowForm(true);
  };
  
  const handleDeleteTask = async (id: string) => {
    if (!taskListId) return;
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await deleteTask(taskListId, id);
      setTasks(prev => prev.filter(t => t.id !== id));
      setError(null);
      loadTaskList(); // Refresh task list to update count and progress
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err as ErrorResponse);
    }
  };
  
  const handleToggleTaskStatus = async (task: TaskDto) => {
    if (!taskListId || !task.id) return;
    
    const updatedTask = {
      ...task,
      status: task.status === TaskStatus.OPEN ? TaskStatus.CLOSED : TaskStatus.OPEN
    };
    
    try {
      const result = await updateTask(taskListId, task.id, updatedTask);
      setTasks(prev => prev.map(t => t.id === task.id ? result : t));
      setError(null);
      loadTaskList(); // Refresh task list to update count and progress
    } catch (err) {
      console.error('Error updating task status:', err);
      setError(err as ErrorResponse);
    }
  };
  
  const handleSubmitTask = async (task: TaskDto) => {
    if (!taskListId) return;
    setIsSubmitting(true);
    
    try {
      if (editingTask?.id) {
        // Update existing task
        const updated = await updateTask(taskListId, editingTask.id, task);
        setTasks(prev => prev.map(t => t.id === editingTask.id ? updated : t));
      } else {
        // Create new task
        const created = await createTask(taskListId, task);
        setTasks(prev => [...prev, created]);
      }
      
      setShowForm(false);
      setEditingTask(undefined);
      setError(null);
      loadTaskList(); // Refresh task list to update count and progress
    } catch (err) {
      console.error('Error saving task:', err);
      setError(err as ErrorResponse);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };
  
  const handleBackToLists = () => {
    navigate('/');
  };
  
  if (isLoading && !taskList) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title={taskList?.title || 'Task List'}>
      <ErrorAlert error={error} onClose={() => setError(null)} />
      
      <div className="mb-6">
        <button
          onClick={handleBackToLists}
          className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Lists
        </button>
      </div>
      
      {taskList && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{taskList.title}</h1>
              {taskList.description && (
                <p className="mt-1 text-gray-600 dark:text-gray-300">{taskList.description}</p>
              )}
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {taskList.count || 0} tasks
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={handleAddTask}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <PlusCircle className="h-5 w-5 mr-1" />
                Add Task
              </button>
            </div>
          </div>
          
          {(taskList.progress !== undefined) && (
            <div className="mt-4">
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span>Progress</span>
                <span>{!isNaN(Number(taskList.progress)) ? Math.round(Number(taskList.progress) * 100) : 0}%</span>
              </div>
              <ProgressBar value={taskList.progress} total={1} size="md" />
            </div>
          )}
        </div>
      )}
      
      {showForm ? (
        <div className="mt-6">
          <TaskForm 
            task={editingTask}
            onSubmit={handleSubmitTask}
            onCancel={handleCancelForm}
            isSubmitting={isSubmitting}
          />
        </div>
      ) : (
        <>
          <div className="mb-4">
            <TaskFilters
              priorityFilter={priorityFilter}
              statusFilter={statusFilter}
              onPriorityChange={setPriorityFilter}
              onStatusChange={setStatusFilter}
            />
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleStatus={handleToggleTaskStatus}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default TaskListPage;