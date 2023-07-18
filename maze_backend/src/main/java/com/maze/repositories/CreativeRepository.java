package com.maze.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

import com.maze.models.Creative;
import com.maze.models.Role;

public interface CreativeRepository extends JpaRepository<Creative, Long> {
    Optional<Creative> findByEmail(String email);

    Optional<Creative> findByUsername(String username);

    Optional<Creative> findByUsernameOrEmail(String username, String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByUsernameOrEmail(String username, String email);

    Set<Creative> findByRolesIn(Set<Role> roles);

}
