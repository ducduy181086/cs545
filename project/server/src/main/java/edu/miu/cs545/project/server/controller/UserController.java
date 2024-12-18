package edu.miu.cs545.project.server.controller;

import edu.miu.cs545.project.server.entity.dto.UserDto;
import edu.miu.cs545.project.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDto>> get(
        @RequestParam(name = "sortby", defaultValue = "id") String sortBy,
        @RequestParam(name = "direction", defaultValue = "asc") String direction) {
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        List<UserDto> users = userService.getAll(sort);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> get(@PathVariable long id) {
        var user = userService.getById(id);
        return ResponseEntity.ok(user);
    }
}
