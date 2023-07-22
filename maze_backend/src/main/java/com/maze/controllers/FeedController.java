package com.maze.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maze.enumerations.FeedItemType;
import com.maze.models.Creative;
import com.maze.models.FeedItem;
import com.maze.services.CreativeService;
import com.maze.services.FeedItemService;

import jakarta.transaction.Transactional;

import java.sql.Timestamp;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/feed")
public class FeedController {

    @Autowired
    private FeedItemService feedItemService;

    @Autowired
    private CreativeService creativeService;

    Timestamp now = new Timestamp(System.currentTimeMillis());

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<FeedItem>> getMyFeed(@AuthenticationPrincipal UserDetails userDetails) {
        List<FeedItem> feedItems = feedItemService.getAllMyFeedItems(userDetails.getUsername());
        return ResponseEntity.ok(feedItems);
    }

    @GetMapping("/items/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<FeedItem> getFeedItemById(@PathVariable Long id) {
        FeedItem feedItem = feedItemService.findFeedItemById(id);
        return ResponseEntity.ok(feedItem);
    }

    @PostMapping("/items")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<FeedItem> createFeedItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody(required = false) FeedItem fi) {
        FeedItem feedItem = new FeedItem();
        Creative author = creativeService.findCreativeByUsername(userDetails.getUsername());
        feedItem.setCaption(fi.getCaption());
        feedItem.setCreatedAt(now);
        if (fi.getCollection() != null) {
            feedItem.setCollection(fi.getCollection());
            if (feedItem.getCollection().getUpdatedAt() != null) {
                feedItem.setType(FeedItemType.UPDATE);
            } else {
                feedItem.setType(FeedItemType.NEW);
            }
        } else {
            feedItem.setType(FeedItemType.NEW);
        }
        feedItem.setAuthor(author);
        FeedItem newFeedItem = feedItemService.saveFeedItem(feedItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(newFeedItem);
    }

    @Transactional
    @PutMapping("items/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<FeedItem> updateFeedItem(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody FeedItem fi,
            @PathVariable Long id) {
        if (feedItemService.existsById(id)) {
            // Check if the authenticated user has the admin role or if the ID matches the
            // authenticated user
            if (userDetails.getAuthorities().contains(
                    new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                    userDetails.getUsername().equals(
                            feedItemService.findFeedItemById(id).getAuthor().getUsername())) {
                FeedItem feedItem = feedItemService.findFeedItemById(id);
                feedItem.setCaption(fi.getCaption());
                feedItem.setCollection(fi.getCollection());
                FeedItem updatedFeedItem = feedItemService.updateFeedItem(feedItem);
                return ResponseEntity.ok().body(updatedFeedItem);
            } else {
                // Return an error or unauthorized response
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("items/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteFeedItem(@PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (feedItemService.existsById(id)) {
            // Check if the authenticated user has the admin role or if the ID matches the
            // authenticated user
            if (userDetails.getAuthorities().contains(
                    new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                    userDetails.getUsername().equals(
                            feedItemService.findFeedItemById(id).getAuthor().getUsername())) {
                feedItemService.deleteFeedItemById(id);
                return ResponseEntity.ok().build();
            } else {
                // Return an error or unauthorized response
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
