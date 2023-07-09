package com.maze.services;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maze.enumerations.PortfolioItemType;
import com.maze.models.Collection;
import com.maze.models.PortfolioItem;
import com.maze.repositories.CollectionRepository;

@Service
public class CollectionService {

    @Autowired
    private CollectionRepository repository;

    @Autowired
    private PortfolioItemService PIService;

    public Collection findCollectionById(Long id) {
        Optional<Collection> collection = repository.findById(id);
        if (collection.isPresent()) {
            return collection.get();
        } else {
            throw new NoSuchElementException("Collection not found with ID: " + id);
        }
    }

    public Collection saveCollection(Collection collection) {
        if (collection.getId() != null) {
            if (collection.getProject() == null) {
                if (PIService.existsByCollectionId(collection.getId())) {
                    PortfolioItem portfolioItem = PIService.findPortfolioItemByCollectionId(collection.getId());
                    portfolioItem.setUpdatedAt(LocalDate.now());
                    PIService.updatePortfolioItem(portfolioItem);
                } else {
                    PortfolioItem portfolioItem = new PortfolioItem();
                    portfolioItem.setCreatedAt(LocalDate.now());
                    portfolioItem.setCollection(collection);
                    portfolioItem.setType(PortfolioItemType.COLLECTION);
                    PIService.savePortfolioItem(portfolioItem);
                }
            } else {
                PortfolioItem portfolioItem = PIService
                        .findPortfolioItemByProjectId(collection.getProject().getId());
                portfolioItem.setUpdatedAt(LocalDate.now());
                PIService.updatePortfolioItem(portfolioItem);
            }
        } else {
            if (collection.getProject() == null) {
                PortfolioItem portfolioItem = new PortfolioItem();
                portfolioItem.setCreatedAt(LocalDate.now());
                portfolioItem.setCollection(collection);
                portfolioItem.setType(PortfolioItemType.COLLECTION);
                PIService.savePortfolioItem(portfolioItem);
            }
        }
        return repository.save(collection);
    }

    public void updateCollection(Collection collection) {
        if (repository.existsById(collection.getId())) {
            repository.save(collection);
        } else {
            throw new NoSuchElementException("Collection not found with ID: " + collection.getId());
        }
    }

    public void deleteCollectionById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NoSuchElementException("Collection not found with ID: " + id);
        }
    }

    public List<Collection> getAllCollections() {
        return repository.findAll();
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

}
