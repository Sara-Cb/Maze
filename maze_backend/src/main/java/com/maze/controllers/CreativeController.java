package com.maze.controllers;

import com.maze.controllers.Utilities.CreativeRequest;
import com.maze.enumerations.Profession;
import com.maze.enumerations.Skill;
import com.maze.models.Collection;
import com.maze.models.Creative;
import com.maze.models.Portfolio;
import com.maze.security.CloudinaryService;
import com.maze.services.CollectionService;
import com.maze.services.CreativeService;
import com.maze.services.FollowService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/creatives")
public class CreativeController {

    @Autowired
    private CreativeService creativeService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private FollowService followService;

    @Autowired
    private CollectionService collectionService;

    @GetMapping
    public ResponseEntity<List<Creative>> getAllCreatives() {
        List<Creative> creatives = creativeService.getAllCreatives();
        return ResponseEntity.ok(creatives);
    }

    @GetMapping("/{username}")
    public ResponseEntity<Creative> getCreativeByUsername(
            @PathVariable String username) {
        Creative creative = creativeService.findCreativeByUsername(username);
        return ResponseEntity.ok(creative);
    }

    @GetMapping("/{username}/portfolio")
    public ResponseEntity<Portfolio> getCreativePortfolioById(
            @PathVariable String username) {
        Portfolio creativePortfolio = creativeService.findCreativeByUsername(username).getPortfolio();
        return ResponseEntity.ok(creativePortfolio);
    }

    @GetMapping("/{username}/collections")
    public ResponseEntity<List<Collection>> getCreativeCollectionById(
            @PathVariable String username) {
        List<Collection> creativeCollections = collectionService.findCollectionsByAuthor(username);
        return ResponseEntity.ok(creativeCollections);
    }

    @Transactional
    @PutMapping("/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Creative> updateCreative(
            @PathVariable String username,
            @RequestBody CreativeRequest creativeRequest,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails.getAuthorities().contains(
                new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                userDetails.getUsername().equals(
                        username)) {
            System.out.println("***************************START REQUEST************************");
            Creative creative = creativeService.findCreativeByUsername(username);
            if (creativeRequest.firstname != null) {
                creative.setFirstname(creativeRequest.firstname);
            }
            if (creativeRequest.lastname != null) {
                creative.setLastname(creativeRequest.lastname);
            }
            if (creativeRequest.professions != null) {
                creative.setProfessions(creativeRequest.professions);
            }
            creative.setStageName(creativeRequest.stageName);
            creative.setBio(creativeRequest.bio);
            creative.setCity(creativeRequest.city);
            creative.setState(creativeRequest.state);
            if (creativeRequest.skills != null) {
                creative.setSkills(creativeRequest.skills);
            } else {
                creative.setSkills(null);
            }
            System.out.println("***************************START update************************");
            Creative updatedCreative = creativeService.updateCreative(creative);
            return ResponseEntity.ok(updatedCreative);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @Transactional
    @PutMapping("/image")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Creative> updateCreativeImage(
            @RequestBody(required = false) MultipartFile image,
            @AuthenticationPrincipal UserDetails userDetails) {
        Creative creative = creativeService.findCreativeByUsername(userDetails.getUsername());
        if (image != null) {
            creative.setImage(cloudinaryService.uploadFile(image));
        } else {
            creative.setImage(null);
        }
        Creative updatedCreative = creativeService.updateCreative(creative);
        return ResponseEntity.ok(updatedCreative);
    }

    @Transactional
    @PutMapping("/{username}/password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Creative> updateCreativePassword(
            @PathVariable String username,
            @RequestBody @Valid String password,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails.getAuthorities().contains(
                new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                userDetails.getUsername().equals(
                        username)) {
            Creative creative = creativeService.findCreativeByUsername(username);
            creative.setPassword(passwordEncoder.encode(password));
            Creative updatedCreative = creativeService.updateCreative(creative);
            return ResponseEntity.ok(updatedCreative);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
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
            creativeService.deleteCreativeByUsername(username);
            return ResponseEntity.noContent().build();
        }
        // Return an error or unauthorized response
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/search")
    @ResponseBody
    public Page<Creative> searchCreatives(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Profession profession,
            @RequestParam(required = false) Set<Skill> skills,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            Pageable pageable) {

        if (name == null && profession == null && skills == null && city == null && state == null) {
            return creativeService.getAllCreativesPage(pageable);
        }

        List<Page<Creative>> partialResults = new ArrayList<>();

        if (name != null) {
            partialResults.add(creativeService.searchCreativesByName(name, pageable));
        }

        if (profession != null) {
            partialResults.add(creativeService.searchCreativesByProfession(profession, pageable));
        }

        if (skills != null) {
            partialResults.add(creativeService.searchCreativesBySkills(skills, pageable));
        }

        if (city != null && state != null) {
            partialResults.add(creativeService.searchCreativesByCityAndState(city, state, pageable));
        }
        List<Creative> commonCreatives = partialResults.stream()
                .map(Page::getContent)
                .flatMap(java.util.Collection::stream)

                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
                .entrySet().stream()
                .filter(e -> e.getValue() == partialResults.size())
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        int pageSize = pageable.getPageSize();
        int pageNumber = pageable.getPageNumber();
        int startIndex = pageNumber * pageSize;
        int endIndex = Math.min(startIndex + pageSize, commonCreatives.size());
        List<Creative> pageContent = commonCreatives.subList(startIndex, endIndex);
        return new PageImpl<>(pageContent, pageable, commonCreatives.size());
    }

    @GetMapping("/follow")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Creative>> getFollowedList(
            @AuthenticationPrincipal UserDetails userDetails) {
        List<Creative> follows = followService.findFollowedCreatives(userDetails.getUsername());
        return ResponseEntity.ok(follows);
    }

    @GetMapping("/follow/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Boolean> isCreativeFollowed(
            @PathVariable String username,
            @AuthenticationPrincipal UserDetails userDetails) {
        Boolean follows = followService.isCreativeFollowed(userDetails.getUsername(), username);
        return ResponseEntity.ok(follows);
    }

    @PostMapping("/toggle-follow/{username}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> toggleFollow(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String username) {
        String message = followService.toggleFollow(userDetails.getUsername(), username);
        return ResponseEntity.ok(message);
    }

}
