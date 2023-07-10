package com.maze.services;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maze.models.Creative;
import com.maze.models.Follow;
import com.maze.repositories.FollowRepository;

@Service
public class FollowService {

    @Autowired
    private FollowRepository repository;

    @Autowired
    private CreativeService creativeService;

    public List<Follow> getAllFollows() {
        return repository.findAll();
    }

    public Follow findFollowById(Long id) {
        Optional<Follow> follow = repository.findById(id);
        if (follow.isPresent()) {
            return follow.get();
        } else {
            throw new NoSuchElementException("Follow not found with ID: " + id);
        }
    }

    public void saveFollow(Follow follow) {
        repository.save(follow);
    }

    public void deleteFollowById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NoSuchElementException("Follow not found with ID: " + id);
        }
    }

    public List<Creative> findFollowedCreatives(String username) {
        Creative creative = creativeService.findCreativeByUsername(username);
        List<Follow> follows = repository.findByFollower(creative);
        List<Creative> followedCreatives = new ArrayList<>();

        for (Follow follow : follows) {
            followedCreatives.add(follow.getFollowed());
        }
        return followedCreatives;
    }

    public boolean isCreativeFollowed(Long followerId, Long followedId) {
        Creative follower = creativeService.findCreativeById(followerId);
        Creative followed = creativeService.findCreativeById(followedId);
        return repository.existsByFollowerAndFollowed(follower, followed);
    }

    public String toggleFollow(Long followerId, Long followedId) {
        Creative follower = creativeService.findCreativeById(followerId);
        Creative followed = creativeService.findCreativeById(followedId);
        if (isCreativeFollowed(followerId, followedId)) {
            Follow follow = repository.findByFollowerAndFollowed(follower, followed);
            repository.deleteById(follow.getId());
            return "You just unfollowed " + followed.getUsername();
        } else {
            Follow follow = new Follow(follower, followed);
            repository.save(follow);
            return "You just followed " + followed.getUsername();
        }
    }

}
