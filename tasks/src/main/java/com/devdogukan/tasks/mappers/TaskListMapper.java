package com.devdogukan.tasks.mappers;

import com.devdogukan.tasks.domain.dtos.TaskListDto;
import com.devdogukan.tasks.domain.entities.TaskList;

public interface TaskListMapper {

    TaskList fromDto(TaskListDto taskListDto);

    TaskListDto toDto(TaskList taskList);

}
