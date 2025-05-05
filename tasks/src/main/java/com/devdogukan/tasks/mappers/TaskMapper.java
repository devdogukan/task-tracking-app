package com.devdogukan.tasks.mappers;

import com.devdogukan.tasks.domain.dtos.TaskDto;
import com.devdogukan.tasks.domain.entities.Task;

public interface TaskMapper {

    Task fromDto(TaskDto taskDto);

    TaskDto toDto(Task task);

}
