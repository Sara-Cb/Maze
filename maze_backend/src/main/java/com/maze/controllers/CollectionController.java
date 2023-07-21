package com.maze.controllers;

import java.sql.Timestamp;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.maze.enumerations.Category;
import com.maze.models.Collection;
import com.maze.models.Creative;
//import com.maze.models.Project;
import com.maze.security.CloudinaryService;
import com.maze.services.CollectionService;
import com.maze.services.CreativeService;
//import com.maze.services.ProjectService;

import jakarta.transaction.Transactional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/collections")
public class CollectionController {

    @Autowired
    private CollectionService collectionService;

    @Autowired
    private CreativeService creativeService;

    // @Autowired
    // private ProjectService projectService;

    @Autowired
    private CloudinaryService cloudinaryService;

    Timestamp now = new Timestamp(System.currentTimeMillis());

    @GetMapping("/{id}")
    public ResponseEntity<Collection> getCollectionById(@PathVariable Long id) {
        Collection collection = collectionService.findCollectionById(id);
        return ResponseEntity.ok(collection);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<Collection> createCollection(
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) MultipartFile coverImage,
            @RequestParam(required = false) String keywords,
            // @RequestParam(required = false) Long projectId,
            @AuthenticationPrincipal UserDetails userDetails) {
        Collection collection = new Collection();
        Creative author = creativeService.findCreativeByUsername(userDetails.getUsername());
        collection.setAuthor(author);
        collection.setPortfolio(author.getPortfolio());
        collection.setCreatedAt(now);
        collection.setTitle(title);
        if (description != null) {
            collection.setDescription(description);
        }
        if (category != null) {
            collection.setCategory(category);
        }
        if (coverImage != null) {
            collection.setCoverImage(cloudinaryService.uploadFile(coverImage));
        }
        if (keywords != null) {
            collection.setKeywords(new HashSet<>(Arrays.asList(keywords.split(","))));
        }
        /*
         * if (projectId != null) {
         * Project project = projectService.findProjectById(projectId);
         * collection.setProject(project);
         * collection.setSingleElement(false);
         * } else {
         * collection.setProject(null);
         * collection.setSingleElement(true);
         * }
         */
        Collection newCollection = collectionService.saveCollection(collection);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCollection);
    }

    @Transactional
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Collection> updateCollection(@PathVariable Long id,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) MultipartFile coverImage,
            @RequestParam(required = false) String keywords,
            // @RequestParam(required = false) Long projectId,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (collectionService.existsById(id)) {
            // Check if the authenticated user has the admin role or if the ID matches the
            // authenticated user
            if (userDetails.getAuthorities().contains(
                    new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                    userDetails.getUsername().equals(
                            collectionService.findCollectionById(id).getAuthor().getUsername())) {
                Collection collection = collectionService.findCollectionById(id);
                collection.setUpdatedAt(now);
                if (title != null) {
                    collection.setTitle(title);
                }
                if (description != null) {
                    collection.setDescription(description);
                }
                if (category != null) {
                    collection.setCategory(category);
                }
                if (coverImage != null) {
                    collection.setCoverImage(cloudinaryService.uploadFile(coverImage));
                }
                if (keywords != null) {
                    collection.setKeywords(new HashSet<>(Arrays.asList(keywords.split(","))));
                }
                /*
                 * if (projectId != null) {
                 * Project project = projectService.findProjectById(projectId);
                 * collection.setProject(project);
                 * collection.setSingleElement(false);
                 * } else {
                 * collection.setProject(null);
                 * collection.setSingleElement(true);
                 * }
                 */
                Collection updatedCollection = collectionService.updateCollection(collection);
                return ResponseEntity.ok(updatedCollection);
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
