package com.maze.dtos;

import java.util.Set;

import com.maze.enumerations.Profession;
import com.maze.enumerations.Skill;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {

    @NotBlank(message = "Username is required")
    @Pattern(regexp = "^[a-z0-9._]+$", message = "Invalid username format")
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[0-9]).*$", message = "Password must contain at least one uppercase letter and one number")
    private String password;

    @NotBlank(message = "First name is required")
    private String firstname;

    @NotBlank(message = "Last name is required")
    private String lastname;

    @NotBlank(message = "Stage name is required")
    private String stageName;

    @NotNull(message = "Add at least one profession")
    private Set<Profession> professions;

    // Facoltativo
    private Set<String> roles;

    // Altri attributi facoltativi
    private String bio;
    private String city;
    private String state;
    private Set<Skill> skills;
}

/*
 * su postman
 * {
 * "name": "Mario Rossi",
 * "username": "mariorossi",
 * "email": "m.rossi@example.com",
 * "password": "root",
 * "professions": ["ILLUSTRATOR", "GRAPHIC_DESIGNER"]
 * "roles": ["MODERATOR", "USER"]
 * }
 */
