package com.maze.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maze.models.Follow;

public interface FollowRepository extends JpaRepository<Follow, Long> {
}
