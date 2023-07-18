package com.maze.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maze.models.FeedItem;
import com.maze.services.FeedItemService;

@RestController
@RequestMapping("/api/feed")
public class FeedController {

    @Autowired
    private FeedItemService feedItemService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<FeedItem>> getMyFeed(@AuthenticationPrincipal UserDetails userDetails) {
        List<FeedItem> feedItems = feedItemService.getAllMyFeedItems(userDetails.getUsername());
        return ResponseEntity.ok(feedItems);
    }

}
