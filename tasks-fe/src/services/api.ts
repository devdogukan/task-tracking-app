import { TaskDto, TaskListDto } from '../types';

const API_BASE_URL = 'http://localhost:8080';

// Error handling helper
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  return response.json();
};

// Task List API
export const getTaskLists = async (): Promise<TaskListDto[]> => {
  const response = await fetch(`${API_BASE_URL}/task-lists`);
  return handleResponse(response);
};

export const getTaskList = async (taskListId: string): Promise<TaskListDto> => {
  const response = await fetch(`${API_BASE_URL}/task-lists/${taskListId}`);
  return handleResponse(response);
};

export const createTaskList = async (taskList: TaskListDto): Promise<TaskListDto> => {
  const response = await fetch(`${API_BASE_URL}/task-lists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskList)
  });
  return handleResponse(response);
};

export const updateTaskList = async (taskListId: string, taskList: TaskListDto): Promise<TaskListDto> => {
  const response = await fetch(`${API_BASE_URL}/task-lists/${taskListId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskList)
  });
  return handleResponse(response);
};

export const deleteTaskList = async (taskListId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/task-lists/${taskListId}`, {
    method: 'DELETE'
  });
  return handleResponse(response);
};

// Task API
export const getTasks = async (taskListId: string): Promise<TaskDto[]> => {
  const response = await fetch(`${API_BASE_URL}/task-list/${taskListId}/tasks`);
  return handleResponse(response);
};

export const getTask = async (taskListId: string, taskId: string): Promise<TaskDto> => {
  const response = await fetch(`${API_BASE_URL}/task-list/${taskListId}/tasks/${taskId}`);
  return handleResponse(response);
};

export const createTask = async (taskListId: string, task: TaskDto): Promise<TaskDto> => {
  const response = await fetch(`${API_BASE_URL}/task-list/${taskListId}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  return handleResponse(response);
};

export const updateTask = async (taskListId: string, taskId: string, task: TaskDto): Promise<TaskDto> => {
  const response = await fetch(`${API_BASE_URL}/task-list/${taskListId}/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  return handleResponse(response);
};

export const deleteTask = async (taskListId: string, taskId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/task-list/${taskListId}/tasks/${taskId}`, {
    method: 'DELETE'
  });
  return handleResponse(response);
};