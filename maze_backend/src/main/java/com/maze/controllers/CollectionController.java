package com.maze.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.maze.models.Collection;
import com.maze.services.CollectionService;
import com.maze.services.CreativeService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/collections")
public class CollectionController {

    @Autowired
    private CollectionService collectionService;

    @Autowired
    private CreativeService creativeService;

    @GetMapping("/{id}")
    public ResponseEntity<Collection> getCollectionById(@PathVariable Long id) {
        Collection collection = collectionService.findCollectionById(id);
        return ResponseEntity.ok(collection);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<Void> createCollection(@RequestBody Collection collection,
            @AuthenticationPrincipal UserDetails userDetails) {
        Collection newCollection = collection;
        newCollection.setAuthor(creativeService.findCreativeByUsername(userDetails.getUsername()));
        collectionService.saveCollection(newCollection);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Transactional
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> updateCollection(@PathVariable Long id, @RequestBody Collection collection,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (collectionService.existsById(id)) {
            // Check if the authenticated user has the admin role or if the ID matches the
            // authenticated user
            if (userDetails.getAuthorities().contains(
                    new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                    userDetails.getUsername().equals(
                            collectionService.findCollectionById(id).getAuthor().getUsername())) {
                collectionService.updateCollection(collection);
                return ResponseEntity.ok().build();
            } else {
                // Return an error or unauthorized response
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteCollection(@PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (collectionService.existsById(id)) {
            // Check if the authenticated user has the admin role or if the ID matches the
            // authenticated user
            if (userDetails.getAuthorities().contains(
                    new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                    userDetails.getUsername().equals(
                            collectionService.findCollectionById(id).getAuthor().getUsername())) {
                collectionService.deleteCollectionById(id);
                return ResponseEntity.ok().build();
            } else {
                // Return an error or unauthorized response
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Collection>> getAllCollections() {
        List<Collection> collections = collectionService.getAllCollections();
        return ResponseEntity.ok(collections);
    }

}
