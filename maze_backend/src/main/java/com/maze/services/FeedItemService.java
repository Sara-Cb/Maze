package com.maze.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maze.models.FeedItem;
import com.maze.repositories.FeedItemRepository;

@Service
public class FeedItemService {

    @Autowired
    private FeedItemRepository repository;

    public FeedItem findFeedItemById(Long id) {
        Optional<FeedItem> feedItem = repository.findById(id);
        if (feedItem.isPresent()) {
            return feedItem.get();
        } else {
            throw new NoSuchElementException("FeedItem not found with ID: " + id);
        }
    }

    public void saveFeedItem(FeedItem feedItem) {
        repository.save(feedItem);
    }

    public void updateFeedItem(FeedItem feedItem) {
        if (repository.existsById(feedItem.getId())) {
            repository.save(feedItem);
        } else {
            throw new NoSuchElementException("FeedItem not found with ID: " + feedItem.getId());
        }
    }

    public void deleteFeedItemById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NoSuchElementException("FeedItem not found with ID: " + id);
        }
    }

    public List<FeedItem> getAllFeedItems() {
        return repository.findAll();
    }

}
