package com.maze.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.maze.models.Role;
import com.maze.models.Creative;
import com.maze.repositories.CreativeRepository;

@Service
public class CreativeService {

    @Autowired
    private CreativeRepository repository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public Creative findCreativeById(Long id) {
        Optional<Creative> creative = repository.findById(id);
        if (creative.isPresent()) {
            return creative.get();
        } else {
            throw new NoSuchElementException(
                    "Creative not found with ID: " + id);
        }
    }

    public void saveCreative(Creative creative) {
        creative.setPassword(creative.getPassword());
        repository.save(creative);
    }

    public void updateCreative(Creative creative) {
        if (repository.existsById(creative.getId())) {
            repository.save(creative);
        } else {
            throw new NoSuchElementException(
                    "Creative not found with ID: " + creative.getId());
        }
    }

    public void deleteCreativeById(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NoSuchElementException(
                    "Creative not found with ID: " + id);
        }
    }

    public List<Creative> getAllCreatives() {
        return repository.findAll();
    }

    public boolean existsById(Long id) {
        return repository.existsById(id);
    }

    public Creative findCreativeByEmail(String email) {
        return repository.findByEmail(email).get();
    }

    public Creative findCreativeByUsername(String username) {
        return repository.findByUsername(username).get();
    }

    public Creative findCreativeByUsernameOrEmail(
            String username, String email) {
        return repository.findByUsernameOrEmail(username, email).get();
    }

    public Set<Creative> searchCreative(String search) {
        return repository.findByUsernameContainingOrFirstnameContainingOrLastnameContainingOrStageNameContaining(search,
                search, search, search);
    }

    public boolean existsByUsername(String username) {
        return repository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    public boolean existsByUsernameOrEmail(String username, String email) {
        return repository.existsByUsernameOrEmail(username, email);
    }

    public Set<Creative> findCreativesByRolesIn(Set<Role> roles) {
        return repository.findByRolesIn(roles);
    }

}