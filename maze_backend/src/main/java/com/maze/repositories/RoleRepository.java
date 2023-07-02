package com.maze.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maze.enumerations.RoleType;
import com.maze.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRole(RoleType role);

    Boolean existsByRole(RoleType role);

}