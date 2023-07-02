package com.maze.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maze.models.FeedItem;

public interface FeedItemRepository extends JpaRepository<FeedItem, Long> {
}
