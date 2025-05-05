package com.devdogukan.tasks.domain.dtos;

import java.time.LocalDateTime;
import java.util.UUID;

import com.devdogukan.tasks.domain.entities.TaskPriority;
import com.devdogukan.tasks.domain.entities.TaskStatus;

public record TaskDto(
        UUID id,
        String title,
        String description,
        LocalDateTime dueDate,
        TaskPriority priority,
        TaskStatus status) {

}
