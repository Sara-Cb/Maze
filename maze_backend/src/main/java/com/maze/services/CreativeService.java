package com.maze.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.maze.models.Role;
import com.maze.enumerations.Profession;
import com.maze.enumerations.Skill;
import com.maze.models.Creative;
import com.maze.repositories.CreativePageRepository;
import com.maze.repositories.CreativeRepository;

@Service
public class CreativeService {

    @Autowired
    private CreativeRepository repository;

    @Autowired
    private CreativePageRepository pageRepository;

    String avatar = "http://res.cloudinary.com/dupn6xl7q/image/upload/v1690028437/wiqzqbqkfwhvkstvlfvb.png";

    public boolean existsByUsername(String username) {
        return repository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    public boolean existsByUsernameOrEmail(String username, String email) {
        return repository.existsByUsernameOrEmail(username, email);
    }

    public List<Creative> getAllCreatives() {
        return repository.findAll();
    }

    public Creative findCreativeByUsername(String username) {
        Optional<Creative> creative = repository.findByUsername(username);
        if (creative.isPresent()) {
            return creative.get();
        } else {
            throw new NoSuchElementException(
                    "Creative not found with ID: " + username);
        }
    }

    public Creative saveCreative(Creative creative) {
        if (creative.getImage() == null) {
            creative.setImage(avatar);
        }
        return repository.save(creative);
    }

    public Creative updateCreative(Creative creative) {
        if (repository.existsByUsername(creative.getUsername())) {
            return repository.save(creative);
        } else {
            throw new NoSuchElementException(
                    "Creative not found with ID: " + creative.getUsername());
        }
    }

    public void deleteCreativeByUsername(String username) {
        if (repository.existsByUsername(username)) {
            Creative creative = findCreativeByUsername(username);
            repository.delete(creative);
        } else {
            throw new NoSuchElementException(
                    "Creative not found with ID: " + username);
        }
    }

    public Creative findCreativeByEmail(String email) {
        return repository.findByEmail(email).get();
    }

    public Creative findCreativeByUsernameOrEmail(
            String username, String email) {
        return repository.findByUsernameOrEmail(username, email).get();
    }

    public Set<Creative> findCreativesByRolesIn(Set<Role> roles) {
        return repository.findByRolesIn(roles);
    }

    public Page<Creative> searchCreativesByName(String name, Pageable pageable) {
        Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by("stageName").ascending());
        return pageRepository.findByUsernameContainingOrFirstnameContainingOrLastnameContainingOrStageNameContaining(
                name, name, name, name, sortedPageable);
    }

    public Page<Creative> searchCreativesByCityAndState(String city, String state, Pageable pageable) {
        return pageRepository.findByCityAndState(city, state, pageable);
    }

    public Page<Creative> searchCreativesByProfession(Profession profession, Pageable pageable) {
        return pageRepository.findByProfessionsIn(Set.of(profession), pageable);
    }

    public Page<Creative> searchCreativesBySkills(Set<Skill> skills, Pageable pageable) {
        return pageRepository.findBySkillsContainingAll(skills, pageable);
    }

    public Page<Creative> getAllCreativesPage(Pageable pageable) {
        return pageRepository.findAll(pageable);
    }

}