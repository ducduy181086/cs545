package edu.miu.cs545.project.server.util;

import edu.miu.cs545.project.server.entity.Role;
import edu.miu.cs545.project.server.entity.RoleType;
import edu.miu.cs545.project.server.service.impl.MyUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.function.Function;

@Component
public class JwtUtil {
    private final SecretKey key = Keys.hmacShaKeyFor("_dfsdf_tknn_jfks_fsjhfj_jfhgfdjtop_secret_key".getBytes(StandardCharsets.UTF_8));
    //private final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    public final long expiration = 1000 * 60 * 60 * 1; // 1 hour
    private final long refreshExpiration = 1000 * 60 * 60 * 24; // 24 hours

    @Autowired
    private UserDetailsService userDetailsService;

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    public Date getIssuedAtDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getIssuedAt);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public String generateToken(UserDetails userDetails, Long ownerId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities());
        claims.put("ownerId", ownerId);

        return doGenerateToken(claims, userDetails.getUsername());
    }

    private String doGenerateToken(Map<String, Object> claims, String subject) {
        long now = System.currentTimeMillis();
        return Jwts
            .builder()
            .claims(claims)
            .subject(subject)
            .issuedAt(new Date(now))
            .expiration(new Date(now + expiration))
            .signWith(key, Jwts.SIG.HS256)
            .compact();
    }

    // Overridden to accommodate the refresh token
    public String doGenerateToken(String subject) {
        return Jwts.builder()
//                .claims(claims)
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }

    public String generateRefreshToken(String email) {
        long now = System.currentTimeMillis();
        return Jwts
            .builder()
            .claims(new HashMap<>())
            .subject(email)
            .issuedAt(new Date(now))
            .expiration(new Date(now + refreshExpiration))
            .signWith(key, Jwts.SIG.HS256)
            .compact();
    }

    public String getSubject(String token) {
        return Jwts.parser()
            .verifyWith(key)
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);
            return true;
        } catch (SignatureException e) {
            System.out.println(e.getMessage());
        } catch (MalformedJwtException e) {
            System.out.println(e.getMessage());
        } catch (ExpiredJwtException e) {
            System.out.println(e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.out.println(e.getMessage());
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
        return false;
    }

    public Authentication getAuthentication(String token) {
        Claims claims = getAllClaimsFromToken(token);
        String username = claims.getSubject();
        List<Role> entityRoles = new ArrayList<>();
        List<Map<String, String>> roles = claims.get("roles", List.class);
        for (Map<String, String> role : roles) {
            String authority = role.get("authority");
            Role roleEntity = new Role();
            roleEntity.setRoleType(RoleType.valueOf(authority.toUpperCase()));
            entityRoles.add(roleEntity);
        }

        UserDetails userDetails = new MyUserDetails(username, entityRoles);
        var authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        return authentication;
    }


    public String doGenerateRefreshToken(Map<String, Object> claims, String subject) {

        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                // the token will be expired in 10 hours
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }


    public String getUsernameFromToken(String token) {
        String result = null;
        try {
            result = Jwts.parser()
                    .verifyWith(key )
                    .build()
                    .parseSignedClaims(token)
                    .getPayload()
                    .getSubject();
        } catch (ExpiredJwtException e) {
            System.out.println(e.getMessage());
            throw e;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return result;
    }
}
