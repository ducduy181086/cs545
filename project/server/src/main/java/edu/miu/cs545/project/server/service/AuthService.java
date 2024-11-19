package edu.miu.cs545.project.server.service;

import edu.miu.cs545.project.server.entity.dto.request.LoginRequest;
import edu.miu.cs545.project.server.entity.dto.request.RefreshTokenRequest;
import edu.miu.cs545.project.server.entity.dto.response.CommonResponse;
import edu.miu.cs545.project.server.entity.dto.response.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest loginRequest);
    LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
    CommonResponse registerAsBuyer(LoginRequest loginRequest);
    CommonResponse registerAsSeller(LoginRequest loginRequest);
}
