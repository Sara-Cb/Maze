package com.maze.services;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maze.models.Creative;
import com.maze.models.FeedItem;
import com.maze.repositories.FeedItemRepository;

@Service
public class FeedItemService {

    @Autowired
    private FeedItemRepository repository;

    @Autowired
    private CreativeService creativeService;

    @Autowired
    private FollowService followService;

    public List<FeedItem> getAllFeedItems() {
        return repository.findAll();
    }

    public FeedItem findFeedItemById(Long id) {
        Optional<FeedItem> feedItem = repository.findById(id);
        if (feedItem.isPresent()) {
            return feedItem.get();
        } else {
            throw new NoSuchElementException("FeedItem not found with ID: " + id);
        }
    }

    public List<FeedItem> findFeedItemsByAuthor(String username) {
        if (creativeService.findCreativeByUsername(username) != null) {
            return repository.findByAuthorUsername(username);
        } else {
            throw new NoSuchElementException("Creative not found");
        }
    }

    public List<FeedItem> getAllMyFeedItems(String username) {
        List<Creative> follows = followService.findFollowedCreatives(username);
        List<FeedItem> followsItems = new ArrayList<>();

        for (Creative follow : follows) {
            List<FeedItem> items = findFeedItemsByAuthor(follow.getUsername());
            for (FeedItem item : items) {
                followsItems.add(item);
            }
        }

        return followsItems;

    }

    public FeedItem saveFeedItem(FeedItem feedItem) {
        return repository.save(feedItem);
    }

    public FeedItem updateFeedItem(FeedItem feedItem) {
        if (repository.existsById(feedItem.getId())) {
            return repository.save(feedItem);
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

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

}
