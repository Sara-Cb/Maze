package com.maze.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maze.dtos.LoginDto;
import com.maze.dtos.RegisterDto;
import com.maze.payloads.JWTAuthResponse;
import com.maze.services.AuthService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping(value = { "/login", "/signin" })
    public ResponseEntity<?> login(@Valid @RequestBody LoginDto loginDto) {
        try {
            String token = authService.login(loginDto);

            JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
            jwtAuthResponse.setUsername(loginDto.getUsername());
            jwtAuthResponse.setAccessToken(token);

            return ResponseEntity.ok(jwtAuthResponse);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials. Please check your username or password.");
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("User does not exist. Please check your credentials.");
        }
    }

    @PostMapping(value = { "/register", "/signup" })
    public ResponseEntity<String> register(@Valid @RequestBody RegisterDto registerDto) {
        String response = authService.register(registerDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
