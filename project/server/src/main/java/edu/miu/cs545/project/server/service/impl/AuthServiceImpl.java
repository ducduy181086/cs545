package edu.miu.cs545.project.server.service.impl;

import edu.miu.cs545.project.server.entity.*;
import edu.miu.cs545.project.server.entity.dto.UserDto;
import edu.miu.cs545.project.server.entity.dto.request.LoginRequest;
import edu.miu.cs545.project.server.entity.dto.request.RefreshTokenRequest;
import edu.miu.cs545.project.server.entity.dto.response.CommonResponse;
import edu.miu.cs545.project.server.entity.dto.response.LoginResponse;
import edu.miu.cs545.project.server.helper.UserHelper;
import edu.miu.cs545.project.server.repository.*;
import edu.miu.cs545.project.server.service.AuthService;
import edu.miu.cs545.project.server.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    private final RoleRepo roleRepo;
    private final SellerRepo sellerRepo;
    private final BuyerRepo buyerRepo;
    private final ModelMapper modelMapper;
    private final AdminRepo adminRepo;

    @Override
    public LoginResponse login(LoginRequest loginRequest) {
        Authentication result;
        try {
            result = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(e.getMessage());
        }

        var user = userRepo.findByEmail(result.getName()).orElseThrow();
        if (user.getAdminDetails() == null) {
            throw new BadCredentialsException("Did not approve.");
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(result.getName());

        final String accessToken = jwtUtil.generateToken(userDetails);
        final String refreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());
        return new LoginResponse(accessToken, refreshToken, jwtUtil.expiration / 1000);
    }

    @Override
    public LoginResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        boolean isRefreshTokenValid = jwtUtil.validateToken(refreshTokenRequest.getRefreshToken());
        if (isRefreshTokenValid) {
            String userName = jwtUtil.getSubject(refreshTokenRequest.getRefreshToken());
            UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
            String accessToken = jwtUtil.generateToken(userDetails);
            String refreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());

            return new LoginResponse(accessToken, refreshToken, jwtUtil.expiration / 1000);
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
        User userEntity = getUser(loginRequest, true);
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
        User userEntity = getUser(loginRequest, false);
        Seller sellerEntity = new Seller();
        sellerEntity.setUser(userEntity);
        sellerRepo.save(sellerEntity);
        return new CommonResponse("success", "");
    }

    @Override
    public Page<UserDto> getUnapprovedSellers(Pageable pageable) {
        var items = userRepo.findUnapprovedSeller(pageable);
        return items.map(u -> modelMapper.map(u, UserDto.class));
    }
    
    @Override
    public CommonResponse approvedSeller(Long userId) {
        var user = userRepo.findById(userId).orElseThrow();
        var admin = getCurrentAdmin().orElseThrow();
        var seller = user.getSellerDetails();
        seller.setApprovedByAdmin(admin);
        sellerRepo.save(seller);
        return new CommonResponse("success", "");
    }

    private User getUser(LoginRequest loginRequest, boolean isBuyer) {
        User userEntity = new User();
        userEntity.setEmail(loginRequest.getEmail());
        userEntity.setPassword(passwordEncoder.encode(loginRequest.getPassword()));
        var role = roleRepo.getRoleByRoleType(isBuyer ? RoleType.BUYER : RoleType.SELLER);
        userEntity.getRoles().add(role);
        userRepo.save(userEntity);
        return userEntity;
    }

    private Optional<Admin> getCurrentAdmin() {
        String username = UserHelper.getCurrentUserName();
        return adminRepo.findAdminByEmail(username);
    }
}
