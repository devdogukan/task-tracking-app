package com.devdogukan.tasks.services;

import java.util.List;

import com.devdogukan.tasks.domain.entities.TaskList;

public interface TaskListService {
    List<TaskList> listTaskLists();
    TaskList createTaskList(TaskList taskListDto);
}
