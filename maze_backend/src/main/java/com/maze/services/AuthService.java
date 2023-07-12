package com.maze.services;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.maze.dtos.LoginDto;
import com.maze.dtos.RegisterDto;
import com.maze.enumerations.RoleType;
import com.maze.exceptions.MyAPIException;
import com.maze.interfaces.AuthServiceInterface;
import com.maze.models.Portfolio;
import com.maze.models.Role;
import com.maze.models.Creative;
import com.maze.security.JwtTokenProvider;

@Service
public class AuthService implements AuthServiceInterface {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private RoleService roleService;

    @Autowired
    private CreativeService creativeService;

    Timestamp now = new Timestamp(System.currentTimeMillis());

    @Override
    public String login(LoginDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsername(), loginDto.getPassword()));
        System.out.println(authentication);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);
        System.out.println(token);
        return token;
    }

    @Override
    public String register(RegisterDto registerDto) {

        // add check for username exists in database
        if (creativeService.existsByUsername(registerDto.getUsername())) {
            throw new MyAPIException(HttpStatus.BAD_REQUEST, "Username already exists!");
        }

        // add check for email exists in database
        if (creativeService.existsByEmail(registerDto.getEmail())) {
            throw new MyAPIException(
                    HttpStatus.BAD_REQUEST, "Email already exists!");
        }

        Creative creative = new Creative();
        Set<Role> roles = new HashSet<>();
        Role userRole = roleService.findRoleByType(RoleType.ROLE_USER);
        roles.add(userRole);

        creative.setUsername(registerDto.getUsername());
        creative.setEmail(registerDto.getEmail());
        creative.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        creative.setFirstname(registerDto.getFirstname());
        creative.setLastname(registerDto.getLastname());
        creative.setStageName(registerDto.getStageName());
        creative.setRegistrationDate(now);
        creative.setProfessions(registerDto.getProfessions());
        creative.setRoles(roles);
        creative.setBio(registerDto.getBio());
        creative.setCity(registerDto.getCity());
        creative.setState(registerDto.getState());
        creative.setSkills(registerDto.getSkills());

        creative.setPortfolio(new Portfolio());

        creativeService.saveCreative(creative);

        return "Creative registered successfully!";
    }

    public RoleType getRole(String role) {
        if (role.equals("ADMIN"))
            return RoleType.ROLE_ADMIN;
        else if (role.equals("MODERATOR"))
            return RoleType.ROLE_MODERATOR;
        else
            return RoleType.ROLE_USER;
    }

}
