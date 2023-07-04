package com.maze.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maze.models.PortfolioItem;
import com.maze.repositories.PortfolioItemRepository;

@Service
public class PortfolioItemService {

    @Autowired
    private PortfolioItemRepository repository;

    public PortfolioItem findPortfolioItemById(Long id) {
        Optional<PortfolioItem> portfolioItem = repository.findById(id);
        if (portfolioItem.isPresent()) {
            return portfolioItem.get();
        } else {
            throw new NoSuchElementException("PortfolioItem not found with ID: " + id);
        }
    }

    public void savePortfolioItem(PortfolioItem portfolioItem) {
        repository.save(portfolioItem);
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
