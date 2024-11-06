package edu.miu.cs545.lab05.service;

import edu.miu.cs545.lab05.entity.dto.request.LoginRequest;
import edu.miu.cs545.lab05.entity.dto.request.RefreshTokenRequest;
import edu.miu.cs545.lab05.entity.dto.response.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
    LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
