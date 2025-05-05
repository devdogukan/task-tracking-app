import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import TaskListGrid from '../components/task-list/TaskListGrid';
import TaskListForm from '../components/task-list/TaskListForm';
import ErrorAlert from '../components/common/ErrorAlert';
import { TaskListDto, ErrorResponse } from '../types';
import { getTaskLists, createTaskList, updateTaskList, deleteTaskList } from '../services/api';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [taskLists, setTaskLists] = useState<TaskListDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTaskList, setEditingTaskList] = useState<TaskListDto | undefined>(undefined);
  
  useEffect(() => {
    loadTaskLists();
  }, []);
  
  const loadTaskLists = async () => {
    setIsLoading(true);
    try {
      const data = await getTaskLists();
      setTaskLists(data);
      setError(null);
    } catch (err) {
      console.error('Error loading task lists:', err);
      setError(err as ErrorResponse);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleViewTaskList = (id: string) => {
    navigate(`/task-lists/${id}`);
  };
  
  const handleAddTaskList = () => {
    setEditingTaskList(undefined);
    setShowForm(true);
  };
  
  const handleEditTaskList = (taskList: TaskListDto) => {
    setEditingTaskList(taskList);
    setShowForm(true);
  };
  
  const handleDeleteTaskList = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task list?')) return;
    
    try {
      await deleteTaskList(id);
      setTaskLists(prev => prev.filter(tl => tl.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting task list:', err);
      setError(err as ErrorResponse);
    }
  };
  
  const handleSubmitTaskList = async (taskList: TaskListDto) => {
    setIsSubmitting(true);
    
    try {
      if (editingTaskList?.id) {
        // Update existing task list
        const updated = await updateTaskList(editingTaskList.id, taskList);
        setTaskLists(prev => prev.map(tl => tl.id === editingTaskList.id ? updated : tl));
      } else {
        // Create new task list
        const created = await createTaskList(taskList);
        setTaskLists(prev => [...prev, created]);
      }
      
      setShowForm(false);
      setEditingTaskList(undefined);
      setError(null);
    } catch (err) {
      console.error('Error saving task list:', err);
      setError(err as ErrorResponse);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTaskList(undefined);
  };
  
  return (
    <Layout>
      <ErrorAlert error={error} onClose={() => setError(null)} />
      
      {showForm ? (
        <div className="mt-6">
          <TaskListForm 
            taskList={editingTaskList}
            onSubmit={handleSubmitTaskList}
            onCancel={handleCancelForm}
            isSubmitting={isSubmitting}
          />
        </div>
      ) : (
        <TaskListGrid
          taskLists={taskLists}
          onView={handleViewTaskList}
          onEdit={handleEditTaskList}
          onDelete={handleDeleteTaskList}
          onAdd={handleAddTaskList}
          isLoading={isLoading}
        />
      )}
    </Layout>
  );
};

export default HomePage;