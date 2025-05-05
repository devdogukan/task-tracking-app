package com.devdogukan.tasks.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.devdogukan.tasks.domain.entities.Task;
import com.devdogukan.tasks.domain.entities.TaskList;
import com.devdogukan.tasks.domain.entities.TaskPriority;
import com.devdogukan.tasks.domain.entities.TaskStatus;
import com.devdogukan.tasks.repositories.TaskRepository;
import com.devdogukan.tasks.services.TaskListService;
import com.devdogukan.tasks.services.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskListService taskListService;

    public TaskServiceImpl(final TaskRepository taskRepository, final TaskListService taskListService) {
        this.taskRepository = taskRepository;
        this.taskListService = taskListService;
    }

    @Override
    public List<Task> listTasks(UUID taskListId) {
        return taskRepository.findByTaskListId(taskListId);
    }

    @Override
    public Task createTask(UUID taskListId, Task task) {
        if (task.getId() != null) {
            throw new IllegalArgumentException("Task list already has an ID!");
        }
        if (task.getTitle() == null || task.getTitle().isBlank()) {
            throw new IllegalArgumentException("Task list title must be present!");
        }

        TaskPriority taskPriority = Optional.ofNullable(task.getPriority()).orElse(TaskPriority.MEDIUM);

        TaskStatus taskStatus = TaskStatus.OPEN;

        TaskList taskList = taskListService.getTaskList(taskListId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid task list ID provided!"));

        LocalDateTime now = LocalDateTime.now();
        return taskRepository.save(new Task(
                null,
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                taskStatus,
                taskPriority,
                taskList,
                now,
                now));
    }

}
