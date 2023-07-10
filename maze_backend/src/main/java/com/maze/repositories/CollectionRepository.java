package com.maze.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maze.models.Collection;

public interface CollectionRepository extends JpaRepository<Collection, Long> {
}
