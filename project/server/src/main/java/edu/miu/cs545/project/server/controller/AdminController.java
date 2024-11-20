package edu.miu.cs545.project.server.controller;

import edu.miu.cs545.project.server.entity.dto.UserDto;
import edu.miu.cs545.project.server.entity.dto.response.CommonResponse;
import edu.miu.cs545.project.server.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class AdminController {
    private final AuthService authService;

    @GetMapping("/unapproved")
    public Page<UserDto> getUnapprovedSellers(
        @RequestParam(name="page", defaultValue = "0") int page,
        @RequestParam(name="pagesize", defaultValue = "10") int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        return authService.getUnapprovedSellers(pageable);
    }

    @PutMapping("/approved/{userId}")
    public CommonResponse approvedSeller(@PathVariable Long userId) {
        return authService.approvedSeller(userId);
    }
}
