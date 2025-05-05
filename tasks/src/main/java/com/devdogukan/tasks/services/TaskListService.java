package com.devdogukan.tasks.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.devdogukan.tasks.domain.entities.TaskList;

public interface TaskListService {
    List<TaskList> listTaskLists();
    TaskList createTaskList(TaskList taskListDto);
    Optional<TaskList> getTaskList(UUID id);
}
