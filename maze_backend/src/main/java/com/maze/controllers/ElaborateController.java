package com.maze.controllers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

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

import com.maze.enumerations.Category;
import com.maze.models.Collection;
import com.maze.models.Elaborate;
import com.maze.models.Project;
import com.maze.security.CloudinaryService;
import com.maze.services.CreativeService;
import com.maze.services.ElaborateService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/elaborates")
public class ElaborateController {

    @Autowired
    private ElaborateService elaborateService;

    @Autowired
    private CreativeService creativeService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping("/{id}")
    public ResponseEntity<Elaborate> getElaborateById(@PathVariable Long id) {
        Elaborate elaborate = elaborateService.findElaborateById(id);
        return ResponseEntity.ok(elaborate);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<Void> createElaborate(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam Category category,
            @RequestParam("image") MultipartFile file,
            @RequestParam String title,
            String description,
            Set<String> keywords,
            Collection collection,
            Project project) {
        Elaborate elaborate = new Elaborate();
        elaborate.setAuthor(creativeService.findCreativeByUsername(userDetails.getUsername()));
        elaborate.setCategory(category);
        elaborate.setFile(cloudinaryService.uploadFile(file));
        elaborate.setTitle(title);
        elaborate.setPublicationDateTime(LocalDateTime.now());
        elaborate.setDescription(description);
        elaborate.setKeywords(keywords);
        elaborate.setCollection(collection);
        elaborate.setProject(project);
        elaborateService.saveElaborate(elaborate);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // metodo crud non utilizzato
    @Transactional
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> updateElaborate(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam Category category,
            @RequestParam("image") MultipartFile file,
            @RequestParam String title,
            String description,
            Set<String> keywords,
            Collection collection,
            Project project,
            @PathVariable Long id) {
        if (elaborateService.existsById(id)) {
            // Check if the authenticated user has the admin role or if the ID matches the
            // authenticated user
            if (userDetails.getAuthorities().contains(
                    new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                    userDetails.getUsername().equals(
                            elaborateService.findElaborateById(id).getAuthor().getUsername())) {
                Elaborate elaborate = elaborateService.findElaborateById(id);
                elaborate.setAuthor(creativeService.findCreativeByUsername(userDetails.getUsername()));
                elaborate.setCategory(category);
                elaborate.setFile(cloudinaryService.uploadFile(file));
                elaborate.setTitle(title);
                elaborate.setPublicationDateTime(LocalDateTime.now());
                elaborate.setDescription(description);
                elaborate.setKeywords(keywords);
                elaborate.setCollection(collection);
                elaborate.setProject(project);
                elaborateService.updateElaborate(elaborate);
                return ResponseEntity.ok().build();
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

    @GetMapping
    public ResponseEntity<List<Elaborate>> getAllElaborates() {
        List<Elaborate> elaborates = elaborateService.getAllElaborates();
        return ResponseEntity.ok(elaborates);
    }

}
