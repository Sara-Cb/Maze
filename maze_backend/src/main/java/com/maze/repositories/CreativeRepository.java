package com.maze.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

import com.maze.models.Creative;
import com.maze.models.Role;

@Repository
public interface CreativeRepository extends JpaRepository<Creative, Long> {
	Optional<Creative> findByEmail(String email);

    Optional<Creative> findByUsername(String username);

    Optional<Creative> findByUsernameOrEmail(String username, String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Boolean existsByUsernameOrEmail(String username, String email);

    Set<Creative> findByRolesIn(Set<Role> roles);
}
