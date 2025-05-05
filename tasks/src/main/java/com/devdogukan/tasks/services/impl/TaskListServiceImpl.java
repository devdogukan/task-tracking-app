package com.devdogukan.tasks.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.devdogukan.tasks.domain.dtos.TaskListDto;
import com.devdogukan.tasks.mappers.TaskListMapper;
import com.devdogukan.tasks.repositories.TaskListRepository;
import com.devdogukan.tasks.services.TaskListService;

@Service
public class TaskListServiceImpl implements TaskListService {

    private final TaskListRepository taskListRepository;
    private final TaskListMapper taskListMapper;

    public TaskListServiceImpl(final TaskListRepository taskListRepository, final TaskListMapper taskListMapper) {
        this.taskListRepository = taskListRepository;
        this.taskListMapper = taskListMapper;
    }

    @Override
    public List<TaskListDto> listTaskLists() {
        return taskListRepository.findAll()
                .stream()
                .map(taskListMapper::toDto)
                .toList();
    }

}
