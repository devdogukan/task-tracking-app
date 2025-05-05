package com.devdogukan.tasks.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devdogukan.tasks.domain.dtos.TaskListDto;
import com.devdogukan.tasks.services.TaskListService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping(path = "/task-lists")
public class TaskListController {

    private final TaskListService taskListService;

    public TaskListController(final TaskListService taskListService) {
        this.taskListService = taskListService;
    }

    @GetMapping
    public List<TaskListDto> listTaskList() {
        return taskListService.listTaskLists();
    }

}
