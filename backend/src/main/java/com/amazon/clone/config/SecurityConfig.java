package com.amazon.clone.config;

import com.amazon.clone.repository.UserRepository;
import com.amazon.clone.security.JwtAuthenticationFilter;
import com.amazon.clone.security.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public SecurityConfig(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Load user details from the database.
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByUsername(username)
                .map(user -> User.withUsername(user.getUsername())
                        .password(user.getPassword())
                        .roles(user.getRole().replace("ROLE_", "")) // ensures ROLE_ prefix
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    /**
     * Password encoder for hashing passwords.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * AuthenticationManager for authentication in AuthController.
     */
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http,
                                                       PasswordEncoder passwordEncoder,
                                                       UserDetailsService userDetailsService) throws Exception {
        AuthenticationManagerBuilder authBuilder =
                http.getSharedObject(AuthenticationManagerBuilder.class);
        authBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
        return authBuilder.build();
    }

    /**
     * Configure main security filter chain.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        JwtAuthenticationFilter jwtFilter = new JwtAuthenticationFilter(jwtUtil, userRepository);

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {}) // Enable CORS
            .authorizeHttpRequests(auth -> auth
                //  Public endpoints (no token required)
                .requestMatchers("/api/auth/**", "/api/products/**", "/", "/error").permitAll()

                //  Allow GET for admin testing (open)
                .requestMatchers(HttpMethod.GET, "/api/admin/**").permitAll()

                //  Restrict POST/PUT/DELETE for admin only
                .requestMatchers(HttpMethod.POST, "/api/admin/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/admin/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/admin/**").hasRole("ADMIN")

                // 🔐 Everything else requires authentication
                .anyRequest().authenticated()
            )
            // Add JWT filter before default auth filter
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable());

        return http.build();
    }
}
