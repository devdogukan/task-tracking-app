package com.devdogukan.tasks.services.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.devdogukan.tasks.domain.entities.Task;
import com.devdogukan.tasks.repositories.TaskRepository;
import com.devdogukan.tasks.services.TaskService;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(final TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Task> listTasks(UUID taskListId) {
        return taskRepository.findByTaskListId(taskListId);
    }

}
