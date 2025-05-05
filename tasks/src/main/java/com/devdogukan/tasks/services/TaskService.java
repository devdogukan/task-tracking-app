package com.devdogukan.tasks.services;

import java.util.List;
import java.util.UUID;

import com.devdogukan.tasks.domain.entities.Task;

public interface TaskService {
    List<Task> listTasks(UUID taskListId);
}
