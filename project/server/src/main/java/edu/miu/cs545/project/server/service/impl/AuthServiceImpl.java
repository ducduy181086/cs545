package edu.miu.cs545.project.server.service.impl;

import edu.miu.cs545.project.server.entity.Buyer;
import edu.miu.cs545.project.server.entity.Seller;
import edu.miu.cs545.project.server.entity.User;
import edu.miu.cs545.project.server.entity.dto.request.LoginRequest;
import edu.miu.cs545.project.server.entity.dto.request.RefreshTokenRequest;
import edu.miu.cs545.project.server.entity.dto.response.CommonResponse;
import edu.miu.cs545.project.server.entity.dto.response.LoginResponse;
import edu.miu.cs545.project.server.repository.BuyerRepo;
import edu.miu.cs545.project.server.repository.SellerRepo;
import edu.miu.cs545.project.server.repository.UserRepo;
import edu.miu.cs545.project.server.service.AuthService;
import edu.miu.cs545.project.server.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j // This annotation will add some methods for logging.
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final SellerRepo sellerRepo;
    private final BuyerRepo buyerRepo;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Authentication result = null;
        try {
            result = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(e.getMessage());
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(result.getName());

        final String accessToken = jwtUtil.generateToken(userDetails);
        final String refreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());
        var loginResponse = new LoginResponse(accessToken, refreshToken, jwtUtil.expiration / 1000);
        return loginResponse;
    }

    @Override
    public LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        boolean isRefreshTokenValid = jwtUtil.validateToken(refreshTokenRequest.getRefreshToken());
        if (isRefreshTokenValid) {
            String userName = jwtUtil.getSubject(refreshTokenRequest.getRefreshToken());
            UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
            String accessToken = jwtUtil.generateToken(userDetails);
            String refreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());

            var loginResponse = new LoginResponse(accessToken, refreshToken, jwtUtil.expiration / 1000);
            return loginResponse;
        }
        return new LoginResponse();
    }

    @Transactional
    @Override
    public CommonResponse registerAsBuyer(LoginRequest loginRequest) {
        Optional<User> user = userRepo.findByEmail(loginRequest.getEmail());
        if (user.isPresent()) {
            return new CommonResponse("failed", "USER_EXISTED");
        }
        User userEntity = new User();
        userEntity.setEmail(loginRequest.getEmail());
        var t = loginRequest.getPassword();
        userEntity.setPassword(passwordEncoder.encode(loginRequest.getPassword()));
        userRepo.save(userEntity);
        Buyer buyerEntity = new Buyer();
        buyerEntity.setUser(userEntity);
        buyerRepo.save(buyerEntity);
        return new CommonResponse("success", "");
    }

    @Transactional
    @Override
    public CommonResponse registerAsSeller(LoginRequest loginRequest) {
        Optional<User> user = userRepo.findByEmail(loginRequest.getEmail());
        if (user.isPresent()) {
            return new CommonResponse("failed", "USER_EXISTED");
        }
        User userEntity = new User();
        userEntity.setEmail(loginRequest.getEmail());
        userEntity.setPassword(passwordEncoder.encode(loginRequest.getPassword()));
        userRepo.save(userEntity);
        Seller sellerEntity = new Seller();
        sellerEntity.setUser(userEntity);
        sellerRepo.save(sellerEntity);
        return new CommonResponse("success", "");
    }
}
