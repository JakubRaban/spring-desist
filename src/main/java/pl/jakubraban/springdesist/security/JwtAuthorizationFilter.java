package pl.jakubraban.springdesist.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws IOException, ServletException {
        var authentication = getAuthentication(request);
        if (authentication == null) {
            filterChain.doFilter(request, response);
            return;
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        filterChain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        var token = request.getHeader("Authorization");
        if (token != null && !token.isEmpty() && token.startsWith("Bearer ")) {
            try {
                byte[] signingKey = SecretKey.get();
                Jws<Claims> parsedToken = Jwts.parser()
                        .setSigningKey(signingKey)
                        .parseClaimsJws(token.replace("Bearer ", ""));
                String username = parsedToken
                        .getBody()
                        .getSubject();
                List<GrantedAuthority> authorities = ((List<?>) parsedToken.getBody()
                        .get("role")).stream()
                        .map(authority -> new SimpleGrantedAuthority((String) authority))
                        .collect(Collectors.toList());

                if (username != null && !username.isEmpty()) {
                    return new UsernamePasswordAuthenticationToken(username, null, authorities);
                }
            } catch (JwtException | SecurityException | IllegalArgumentException ex) {
                ex.printStackTrace();
            }
        }
        return null;
    }
}