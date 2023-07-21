package com.maze.controllers;

import com.maze.enumerations.Profession;
import com.maze.enumerations.Skill;
import com.maze.models.Creative;
import com.maze.models.Portfolio;
import com.maze.security.CloudinaryService;
import com.maze.services.CreativeService;
import com.maze.services.FollowService;

import jakarta.transaction.Transactional;

import java.util.ArrayList;
import java.util.Collection;
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
            @RequestParam(required = false) Set<Profession> professions) {
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

    @GetMapping("/search")
    @ResponseBody
    public Page<Creative> searchCreatives(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Profession profession,
            @RequestParam(required = false) Set<Skill> skills,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String state,
            Pageable pageable) {

        // Se nessun parametro di ricerca è fornito, restituisci una pagina di tutti i
        // creativi.
        if (name == null && profession == null && skills == null && city == null && state == null) {
            return creativeService.getAllCreativesPage(pageable);
        }

        // Questa lista conterrà i risultati parziali per ogni parametro di ricerca
        // fornito.
        List<Page<Creative>> partialResults = new ArrayList<>();

        // Se il parametro "name" è fornito, cerca creativi per nome.
        if (name != null) {
            partialResults.add(creativeService.searchCreativesByName(name, pageable));
        }

        // Se il parametro "profession" è fornito, cerca creativi per professione.
        if (profession != null) {
            partialResults.add(creativeService.searchCreativesByProfession(profession, pageable));
        }

        // Se il parametro "skills" è fornito, cerca creativi per skills.
        if (skills != null) {
            partialResults.add(creativeService.searchCreativesBySkills(skills, pageable));
        }

        // Se i parametri "city" e "state" sono forniti, cerca creativi per città e
        // stato.
        if (city != null && state != null) {
            partialResults.add(creativeService.searchCreativesByCityAndState(city, state, pageable));
        }

        // Questa operazione di stream trova l'intersezione di tutti i risultati
        // parziali.
        List<Creative> commonCreatives = partialResults.stream()
                // Mappa ogni risultato parziale al suo contenuto (una lista di creativi).
                .map(Page::getContent)
                // Appiattisci la lista di liste in una singola lista.
                .flatMap(Collection::stream)
                // Raggruppa i creativi nella lista per identità e conta le occorrenze di
                // ciascun creativo.
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
                // Mantieni solo le voci la cui conta è uguale al numero di risultati parziali.
                .entrySet().stream()
                .filter(e -> e.getValue() == partialResults.size())
                // Mappa le voci nuovamente ai relativi creativi.
                .map(Map.Entry::getKey)
                // Raccogli i creativi in una lista.
                .collect(Collectors.toList());

        // Questa sezione costruisce una pagina dei creativi comuni basata sul parametro
        // "pageable".
        int pageSize = pageable.getPageSize();
        int pageNumber = pageable.getPageNumber();
        int startIndex = pageNumber * pageSize;
        int endIndex = Math.min(startIndex + pageSize, commonCreatives.size());
        List<Creative> pageContent = commonCreatives.subList(startIndex, endIndex);
        return new PageImpl<>(pageContent, pageable, commonCreatives.size());
    }

    @GetMapping("/{username}/followed")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<Creative>> getMyFollowed(@PathVariable String username,
            @AuthenticationPrincipal UserDetails userDetails) {
        // Check if the authenticated user has the admin role or if the ID matches the
        // authenticated user
        if (userDetails.getAuthorities().contains(
                new SimpleGrantedAuthority("ROLE_ADMIN")) ||
                userDetails.getUsername().equals(
                        username)) {
            List<Creative> follows = followService.findFollowedCreatives(username);
            return ResponseEntity.ok(follows);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/toggle-follow")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> toggleFollow(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam Long followedId) {
        Creative creative = creativeService.findCreativeByUsername(userDetails.getUsername());
        String message = followService.toggleFollow(creative.getId(), followedId);
        return ResponseEntity.ok(message);
    }

}
