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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.maze.models.Collection;
import com.maze.models.Creative;
import com.maze.models.Elaborate;
import com.maze.security.CloudinaryService;
import com.maze.services.CollectionService;
import com.maze.services.CreativeService;
import com.maze.services.ElaborateService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api/elaborates")
public class ElaborateController {

    @Autowired
    private ElaborateService elaborateService;

    @Autowired
    private CollectionService collectionService;

    @Autowired
    private CreativeService creativeService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping
    public ResponseEntity<List<Elaborate>> getAllElaborates() {
        List<Elaborate> elaborates = elaborateService.getAllElaborates();
        return ResponseEntity.ok(elaborates);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Elaborate> getElaborateById(@PathVariable Long id) {
        Elaborate elaborate = elaborateService.findElaborateById(id);
        return ResponseEntity.ok(elaborate);
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Elaborate> createElaborate(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam MultipartFile file,
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Long collectionId) {
        Elaborate elaborate = new Elaborate();
        Creative author = creativeService.findCreativeByUsername(userDetails.getUsername());
        if (collectionId != null) {
            elaborate.setCollection(collectionService.findCollectionById(collectionId));
        } else {
            Collection newCollection = new Collection();
            newCollection.setAuthor(author);
            newCollection.setPortfolio(author.getPortfolio());
            newCollection.setTitle(title);
            elaborate.setCollection(collectionService.saveCollection(newCollection));
        }
        elaborate.setAuthor(author);
        elaborate.setFile(cloudinaryService.uploadFile(file));
        elaborate.setTitle(title);
        elaborate.setDescription(description);
        Elaborate newElaborate = elaborateService.saveElaborate(elaborate);
        return ResponseEntity.status(HttpStatus.CREATED).body(newElaborate);
    }

    // metodo crud non utilizzato
    @Transactional
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Elaborate> updateElaborate(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) MultipartFile file,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) Long collectionId,
            @PathVariable Long id) {
        if (elaborateService.existsById(id)) {
            // Check if the authenticated user has the admin role or if the ID matches the
            // authenticated user
            if (userDetails.getAuthorities().contains(
                    new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                    userDetails.getUsername().equals(
                            elaborateService.findElaborateById(id).getAuthor().getUsername())) {
                Elaborate elaborate = elaborateService.findElaborateById(id);
                if (file != null) {
                    elaborate.setFile(cloudinaryService.uploadFile(file));
                }
                if (title != null) {
                    elaborate.setTitle(title);
                }
                if (collectionId != null) {
                    elaborate.setCollection(collectionService.findCollectionById(collectionId));
                }
                if (description != null) {
                    elaborate.setDescription(description);
                }
                Elaborate updatedElaborate = elaborateService.updateElaborate(elaborate);
                return ResponseEntity.ok().body(updatedElaborate);
            } else {
                // Return an error or unauthorized response
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // metodo crud non utilizzato
    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteElaborate(@PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (elaborateService.existsById(id)) {
            // Check if the authenticated user has the admin role or if the ID matches the
            // authenticated user
            if (userDetails.getAuthorities().contains(
                    new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                    userDetails.getUsername().equals(
                            elaborateService.findElaborateById(id).getAuthor().getUsername())) {
                elaborateService.deleteElaborateById(id);
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
