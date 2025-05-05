// Task and TaskList DTOs
export enum TaskStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED"
}

export enum TaskPriority {
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW"
}

export interface TaskDto {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface TaskListDto {
  id?: string;
  title: string;
  description: string;
  count?: number;
  progress?: number;
  tasks?: TaskDto[];
}

export interface ErrorResponse {
  status: number;
  message: string;
  details: string;
}