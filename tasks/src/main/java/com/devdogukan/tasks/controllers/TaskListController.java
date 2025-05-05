package com.devdogukan.tasks.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devdogukan.tasks.domain.dtos.TaskListDto;
import com.devdogukan.tasks.domain.entities.TaskList;
import com.devdogukan.tasks.mappers.TaskListMapper;
import com.devdogukan.tasks.services.TaskListService;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping(path = "/task-lists")
public class TaskListController {

    private final TaskListService taskListService;
    private final TaskListMapper taskListMapper;

    public TaskListController(final TaskListService taskListService, final TaskListMapper taskListMapper) {
        this.taskListService = taskListService;
        this.taskListMapper = taskListMapper;
    }

    @GetMapping
    public List<TaskListDto> listTaskList() {
        return taskListService.listTaskLists()
                .stream()
                .map(taskListMapper::toDto)
                .toList();
    }

    @PostMapping
    public ResponseEntity<TaskListDto> createTaskList(@RequestBody TaskListDto taskListDto) {
        TaskList createTaskList = taskListService.createTaskList(taskListMapper.fromDto(taskListDto));
        return new ResponseEntity<>(taskListMapper.toDto(createTaskList), HttpStatus.CREATED);
    }

    @GetMapping(path = "/{task_list_id}")
    public ResponseEntity<TaskListDto> getTaskList(@PathVariable("task_list_id") UUID taskListId) {
        Optional<TaskList> foundTaskList = taskListService.getTaskList(taskListId);

        return foundTaskList.map(taskList -> {
            return new ResponseEntity<>(taskListMapper.toDto(taskList), HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/{task_list_id}")
    public ResponseEntity<TaskListDto> updateTaskList(
            @PathVariable("task_list_id") UUID taskListId,
            @RequestBody TaskListDto taskListDto) {

        TaskList updatedTaskLis = taskListService.updateTaskList(taskListId, taskListMapper.fromDto(taskListDto));
        return new ResponseEntity<>(taskListMapper.toDto(updatedTaskLis), HttpStatus.OK);

    }

}
