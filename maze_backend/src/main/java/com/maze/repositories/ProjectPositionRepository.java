package com.maze.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maze.models.ProjectPosition;

public interface ProjectPositionRepository extends JpaRepository<ProjectPosition, Long> {
}