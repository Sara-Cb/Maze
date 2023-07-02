package com.maze.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maze.models.Portfolio;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
}
