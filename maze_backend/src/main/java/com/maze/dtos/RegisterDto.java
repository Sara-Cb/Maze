package com.maze.dtos;

import java.util.Set;

import com.maze.enumerations.Profession;

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

    private String username;

    private String email;

    private String password;

    private String firstname;

    private String lastname;

    private String stageName;

    private Set<Profession> professions;

    // Facoltativo
    private Set<String> roles;
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
