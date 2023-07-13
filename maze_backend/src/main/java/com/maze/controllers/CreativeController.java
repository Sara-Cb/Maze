package com.maze.controllers;

import com.maze.enumerations.Profession;
import com.maze.enumerations.Skill;
import com.maze.models.Creative;
import com.maze.models.Portfolio;
import com.maze.security.CloudinaryService;
import com.maze.services.CreativeService;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/creatives")
public class CreativeController {

    @Autowired
    private CreativeService creativeService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<List<Creative>> getAllCreatives() {
        List<Creative> creatives = creativeService.getAllCreatives();
        return ResponseEntity.ok(creatives);
    }

    @GetMapping("/{username}")
    public ResponseEntity<Creative> getCreativeByUsername(
            @PathVariable String username) {
        Creative creative = creativeService.findCreativeByUsername(username);
        System.out.println("**************" + creative);
        return ResponseEntity.ok(creative);
    }

    @GetMapping("/{username}/portfolio")
    public ResponseEntity<Portfolio> getCreativePortfolioById(
            @PathVariable String username) {
        Portfolio creativePortfolio = creativeService.findCreativeByUsername(username).getPortfolio();
        return ResponseEntity.ok(creativePortfolio);
    }

    @Transactional
    @PutMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Creative> updateCreative(
            @PathVariable Long id,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String password,
            @RequestParam(required = false) String firstname,
            @RequestParam(required = false) String lastname,
            @RequestParam(required = false) String stageName,
            @RequestParam(required = false) String bio,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            @RequestParam(required = false) MultipartFile image,
            @RequestParam(required = false) Set<Skill> skills,
            @RequestParam(required = false) Set<Profession> professions,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // Check if the authenticated user has the admin role or if the ID matches the
        // authenticated user
        if (userDetails.getAuthorities().contains(
                new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                userDetails.getUsername().equals(
                        username)) {
            Creative creative = creativeService.findCreativeByUsername(username);
            if (username != null) {
                creative.setUsername(username);
            }
            if (password != null) {
                creative.setPassword(passwordEncoder.encode(password));
            }
            if (firstname != null) {
                creative.setFirstname(firstname);
            }
            if (lastname != null) {
                creative.setLastname(lastname);
            }
            if (stageName != null) {
                creative.setStageName(stageName);
            }
            if (bio != null) {
                creative.setBio(bio);
            }
            if (city != null) {
                creative.setCity(city);
            }
            if (state != null) {
                creative.setState(state);
            }
            if (image != null) {
                creative.setImage(cloudinaryService.uploadFile(image));
            }
            if (skills != null) {
                creative.setSkills(skills);
            }
            if (professions != null) {
                creative.setProfessions(professions);
            }
            Creative updatedCreative = creativeService.updateCreative(creative);
            return ResponseEntity.ok(updatedCreative);
        }
        // Return an error or unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @DeleteMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> deleteCreative(
            @PathVariable String username, @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // Check if the authenticated user has the admin role or if the ID matches the
        // authenticated user
        if (userDetails.getAuthorities().contains(
                new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                userDetails.getUsername().equals(
                        username)) {
            Long id = creativeService.findCreativeByUsername(username).getId();
            creativeService.deleteCreativeById(id);
            return ResponseEntity.noContent().build();
        }
        // Return an error or unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
