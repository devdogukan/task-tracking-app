package com.devdogukan.tasks.controllers;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devdogukan.tasks.domain.dtos.TaskDto;
import com.devdogukan.tasks.domain.entities.Task;
import com.devdogukan.tasks.mappers.TaskMapper;
import com.devdogukan.tasks.services.TaskService;

@RestController
@RequestMapping(path = "/task-list/{task_list_id}/tasks")
public class TaskController {

    private final TaskService taskService;
    private final TaskMapper taskMapper;

    public TaskController(final TaskService taskService, final TaskMapper taskMapper) {
        this.taskService = taskService;
        this.taskMapper = taskMapper;
    }

    @GetMapping
    public List<TaskDto> listTasks(@PathVariable("task_list_id") UUID taskListId) {
        return taskService.listTasks(taskListId)
                .stream()
                .map(taskMapper::toDto)
                .toList();
    }

    @PostMapping
    public ResponseEntity<TaskDto> createTask(
            @PathVariable("task_list_id") UUID taskListId,
            @RequestBody TaskDto taskDto) {
        Task savedTask = taskService.createTask(taskListId, taskMapper.fromDto(taskDto));

        return new ResponseEntity<>(taskMapper.toDto(savedTask), HttpStatus.OK);
    }

    @GetMapping(path = "/{task_id}")
    public ResponseEntity<TaskDto> getTask(
            @PathVariable("task_list_id") UUID taskListId,
            @PathVariable("task_id") UUID taskId) {
        Optional<Task> result = taskService.getTask(taskListId, taskId);

        return result.map(task -> {
            return new ResponseEntity<>(taskMapper.toDto(task), HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping(path = "/{task_id}")
    public ResponseEntity<TaskDto> updateTask(
            @PathVariable("task_list_id") UUID taskListId,
            @PathVariable("task_id") UUID taskId,
            @RequestBody TaskDto taskDto) {

        Task updatedTask = taskService.updateTask(taskListId, taskId, taskMapper.fromDto(taskDto));

        return new ResponseEntity<>(taskMapper.toDto(updatedTask), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{task_id}")
    public ResponseEntity<?> deleteTask(
            @PathVariable("task_list_id") UUID taskListId,
            @PathVariable("task_id") UUID taskId) {
        taskService.deleteTask(taskListId, taskId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
