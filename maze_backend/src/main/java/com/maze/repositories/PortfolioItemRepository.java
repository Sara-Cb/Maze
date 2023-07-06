package com.maze.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.maze.models.PortfolioItem;

public interface PortfolioItemRepository extends JpaRepository<PortfolioItem, Long> {

    PortfolioItem findByElaborateId(Long elaborateId);

    PortfolioItem findByCollectionId(Long collectionId);

    PortfolioItem findByProjectId(Long projectId);

    boolean existsByElaborateId(Long elaborateId);

    boolean existsByCollectionId(Long collectionId);

    boolean existsByProjectId(Long projectId);

}
