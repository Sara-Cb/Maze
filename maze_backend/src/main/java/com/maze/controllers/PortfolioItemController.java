package com.maze.controllers;

import java.time.LocalDate;
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

import com.maze.models.PortfolioItem;
import com.maze.services.CreativeService;
import com.maze.services.PortfolioItemService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/portfolioItems")
public class PortfolioItemController {

    @Autowired
    private PortfolioItemService portfolioItemService;

    @Autowired
    private CreativeService creativeService;

    @GetMapping("/{id}")
    public ResponseEntity<PortfolioItem> getPortfolioItemById(@PathVariable Long id) {
        PortfolioItem portfolioItem = portfolioItemService.findPortfolioItemById(id);
        return ResponseEntity.ok(portfolioItem);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<Void> createPortfolioItem(@RequestBody PortfolioItem portfolioItem,
            @AuthenticationPrincipal UserDetails userDetails) {
        PortfolioItem newPortfolioItem = portfolioItem;
        newPortfolioItem.setPortfolio(creativeService.findCreativeByUsername(userDetails.getUsername()).getPortfolio());
        newPortfolioItem.setCreatedAt(LocalDate.now());
        portfolioItemService.savePortfolioItem(newPortfolioItem);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Transactional
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> updatePortfolioItem(@PathVariable Long id, @RequestBody PortfolioItem portfolioItem,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (portfolioItemService.existsById(id)) {
            // Check if the authenticated user has the admin role or if the ID matches the
            // authenticated user
            if (userDetails.getAuthorities().contains(
                    new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                    userDetails.getUsername().equals(
                            portfolioItemService.findPortfolioItemById(id).getPortfolio().getCreative()
                                    .getUsername())) {
                portfolioItem.setUpdatedAt(LocalDate.now());
                portfolioItemService.updatePortfolioItem(portfolioItem);
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
    public ResponseEntity<Void> deletePortfolioItem(@PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        if (portfolioItemService.existsById(id)) {
            // Check if the authenticated user has the admin role or if the ID matches the
            // authenticated user
            if (userDetails.getAuthorities().contains(
                    new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                    userDetails.getUsername().equals(
                            portfolioItemService.findPortfolioItemById(id).getPortfolio().getCreative()
                                    .getUsername())) {
                portfolioItemService.deletePortfolioItemById(id);
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
    public ResponseEntity<List<PortfolioItem>> getAllPortfolioItems() {
        List<PortfolioItem> portfolioItems = portfolioItemService.getAllPortfolioItems();
        return ResponseEntity.ok(portfolioItems);
    }

}
