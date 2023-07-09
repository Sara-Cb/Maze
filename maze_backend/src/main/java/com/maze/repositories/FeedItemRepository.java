package com.maze.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maze.models.FeedItem;

public interface FeedItemRepository extends JpaRepository<FeedItem, Long> {

    FeedItem findByElaborateId(Long elaborateId);

    FeedItem findByCollectionId(Long collectionId);

    FeedItem findByProjectId(Long projectId);

    boolean existsByElaborateId(Long elaborateId);

    boolean existsByCollectionId(Long collectionId);

    boolean existsByProjectId(Long projectId);
}
