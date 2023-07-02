package com.maze.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maze.models.Follow;
import com.maze.repositories.FollowRepository;

@Service
public class FollowService {

    @Autowired
    private FollowRepository repository;

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

    public void updateFollow(Follow follow) {
        if (repository.existsById(follow.getId())) {
            repository.save(follow);
        } else {
            throw new NoSuchElementException("Follow not found with ID: " + follow.getId());
        }
    }

    public void deleteFollowById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NoSuchElementException("Follow not found with ID: " + id);
        }
    }

    public List<Follow> getAllFollows() {
        return repository.findAll();
    }

}
