package com.maze.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.maze.models.Creative;
import com.maze.models.FeedItem;
import com.maze.services.CreativeService;
import com.maze.services.FeedItemService;
import com.maze.services.FollowService;

@RestController
@RequestMapping("/api/feed")
public class FeedController {

    @Autowired
    private FeedItemService feedItemService;

    @Autowired
    private FollowService followService;

    @Autowired
    private CreativeService creativeService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<FeedItem>> getMyFeed(@AuthenticationPrincipal UserDetails userDetails) {
        List<FeedItem> feedItems = feedItemService.getAllMyFeedItems(userDetails.getUsername());
        return ResponseEntity.ok(feedItems);
    }

    @GetMapping("/follow")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Creative>> getMyFollowed(@AuthenticationPrincipal UserDetails userDetails) {
        List<Creative> follows = followService.findFollowedCreatives(userDetails.getUsername());
        return ResponseEntity.ok(follows);
    }

    @PostMapping("/follow/toggle")
    public ResponseEntity<String> toggleFollow(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam Long followedId) {
        Creative creative = creativeService.findCreativeByUsername(userDetails.getUsername());
        String message = followService.toggleFollow(creative.getId(), followedId);
        return ResponseEntity.ok(message);
    }

}
