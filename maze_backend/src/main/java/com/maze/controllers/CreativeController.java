package com.maze.controllers;

import com.maze.models.Creative;
import com.maze.services.CreativeService;

import jakarta.transaction.Transactional;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/creatives")
public class CreativeController {

    @Autowired
    private CreativeService creativeService;

    @GetMapping
    public ResponseEntity<List<Creative>> getAllCreatives() {
        List<Creative> creatives = creativeService.getAllCreatives();
        return ResponseEntity.ok(creatives);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Creative> getCreativeById(
            @PathVariable Long id) {
        Creative creative = creativeService.findCreativeById(id);
        return ResponseEntity.ok(creative);
    }

    @Transactional
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Creative> updateCreative(
            @PathVariable Long id, @RequestBody Creative updatedCreative,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // Check if the authenticated user has the admin role or if the ID matches the
        // authenticated user
        if (userDetails.getAuthorities().contains(
                new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                userDetails.getUsername().equals(
                        creativeService.findCreativeById(id).getUsername())) {
            creativeService.updateCreative(updatedCreative);
            Creative creative = creativeService.findCreativeById(id);
            return ResponseEntity.ok(creative);
        }
        // Return an error or unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteCreative(
            @PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // Check if the authenticated user has the admin role or if the ID matches the
        // authenticated user
        if (userDetails.getAuthorities().contains(
                new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                userDetails.getUsername().equals(
                        creativeService.findCreativeById(id).getUsername())) {
            creativeService.deleteCreativeById(id);
            return ResponseEntity.noContent().build();
        }
        // Return an error or unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
