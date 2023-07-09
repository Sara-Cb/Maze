package com.maze.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maze.enumerations.FeedItemType;
import com.maze.models.FeedItem;
import com.maze.models.PortfolioItem;
import com.maze.repositories.PortfolioItemRepository;

@Service
public class PortfolioItemService {

    @Autowired
    private PortfolioItemRepository repository;

    @Autowired
    private FeedItemService feedItemService;

    public PortfolioItem findPortfolioItemById(Long id) {
        Optional<PortfolioItem> portfolioItem = repository.findById(id);
        if (portfolioItem.isPresent()) {
            return portfolioItem.get();
        } else {
            throw new NoSuchElementException("PortfolioItem not found with ID: " + id);
        }
    }

    public PortfolioItem savePortfolioItem(PortfolioItem portfolioItem) {
        repository.save(portfolioItem);
        FeedItem feedItem = new FeedItem();
        feedItem.setAuthor(portfolioItem.getPortfolio().getCreative());
        feedItem.setPublicationDateTime(LocalDateTime.now());
        feedItem.setItem(portfolioItem);
        if (portfolioItem.getId() != null) {
            feedItem.setType(FeedItemType.UPDATE);
            portfolioItem.setUpdatedAt(LocalDate.now());
        } else {
            feedItem.setType(FeedItemType.NEW);
            portfolioItem.setCreatedAt(LocalDate.now());
        }
        feedItemService.saveFeedItem(feedItem);
        return portfolioItem;
    }

    public void updatePortfolioItem(PortfolioItem portfolioItem) {
        if (repository.existsById(portfolioItem.getId())) {
            repository.save(portfolioItem);
        } else {
            throw new NoSuchElementException("PortfolioItem not found with ID: " + portfolioItem.getId());
        }
    }

    public void deletePortfolioItemById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NoSuchElementException("PortfolioItem not found with ID: " + id);
        }
    }

    public List<PortfolioItem> getAllPortfolioItems() {
        return repository.findAll();
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public PortfolioItem findPortfolioItemByElaborateId(Long elaborateId) {
        return repository.findByElaborateId(elaborateId);
    }

    public PortfolioItem findPortfolioItemByCollectionId(Long collectionId) {
        return repository.findByCollectionId(collectionId);
    }

    public PortfolioItem findPortfolioItemByProjectId(Long projectId) {
        return repository.findByProjectId(projectId);
    }

    public boolean existsByElaborateId(Long elaborateId) {
        return repository.existsByElaborateId(elaborateId);
    }

    public boolean existsByCollectionId(Long collectionId) {
        return repository.existsByCollectionId(collectionId);
    }

    public boolean existsByProjectId(Long projectId) {
        return repository.existsByProjectId(projectId);
    }

}
