package com.devdogukan.tasks.services;

import java.util.List;

import com.devdogukan.tasks.domain.dtos.TaskListDto;

public interface TaskListService {
    List<TaskListDto> listTaskLists();
}
