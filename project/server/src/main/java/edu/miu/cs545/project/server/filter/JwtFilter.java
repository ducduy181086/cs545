package edu.miu.cs545.project.server.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.miu.cs545.project.server.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Map;

@Component
@AllArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = extractTokenFromRequest(request);
        if (token != null) {
            var validResult = jwtUtil.validateToken(token);
            if (validResult.isSuccess()) {
                SecurityContextHolder.getContext().setAuthentication(jwtUtil.getAuthentication(token));
            }
            else {
                handleInvalidToken(response, validResult.getCode());
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    public String extractTokenFromRequest(HttpServletRequest request) {
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            var token = authorizationHeader.substring(7);
            return token;
        }
        return null;
    }

    private void handleInvalidToken(HttpServletResponse response, String errorMessage) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
        response.setContentType("application/json");

        var errorResponse = Map.of(
            "code", errorMessage
        );

        var objectMapper = new ObjectMapper();
        response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
    }
}
