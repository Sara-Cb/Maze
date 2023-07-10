package com.maze.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maze.models.FeedItem;

public interface FeedItemRepository extends JpaRepository<FeedItem, Long> {

    List<FeedItem> findByAuthorUsername(String username);
}
