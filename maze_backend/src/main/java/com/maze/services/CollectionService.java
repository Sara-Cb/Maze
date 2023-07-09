package com.maze.services;

import java.sql.Timestamp;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maze.models.Collection;
import com.maze.repositories.CollectionRepository;

@Service
public class CollectionService {

    @Autowired
    private CollectionRepository repository;

    Timestamp now = new Timestamp(System.currentTimeMillis());

    public Collection findCollectionById(Long id) {
        Optional<Collection> collection = repository.findById(id);
        if (collection.isPresent()) {
            return collection.get();
        } else {
            throw new NoSuchElementException("Collection not found with ID: " + id);
        }
    }

    public Collection saveCollection(Collection collection) {
        if (collection.getId() == null) {
            collection.setCreatedAt(now);
        } else {
            collection.setUpdatedAt(now);
        }
        return repository.save(collection);
    }

    public Collection updateCollection(Collection collection) {
        if (repository.existsById(collection.getId())) {
            return repository.save(collection);
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
