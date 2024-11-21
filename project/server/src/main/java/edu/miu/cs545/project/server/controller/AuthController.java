package edu.miu.cs545.project.server.controller;

import edu.miu.cs545.project.server.entity.dto.request.LoginRequest;
import edu.miu.cs545.project.server.entity.dto.request.RefreshTokenRequest;
import edu.miu.cs545.project.server.entity.dto.response.LoginResponse;
import edu.miu.cs545.project.server.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/v1/authenticate")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        var loginResponse = authService.login(loginRequest);
        return new ResponseEntity<>(
                loginResponse, HttpStatus.OK);
    }

    @PostMapping("/refreshToken")
    public LoginResponse refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authService.refreshToken(refreshTokenRequest);
    }

    @PostMapping("/register-buyer")
    public ResponseEntity<?> registerAsBuyer(@RequestBody LoginRequest loginRequest) {
        var response = authService.registerAsBuyer(loginRequest);
        if (Objects.equals(response.getStatus(), "success")) {
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/register-seller")
    public ResponseEntity<?> registerAsSeller(@RequestBody LoginRequest loginRequest) {
        var response = authService.registerAsSeller(loginRequest);
        if (Objects.equals(response.getStatus(), "success")) {
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
