package com.maze.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.maze.enumerations.Category;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "elaborates")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Elaborate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "author", referencedColumnName = "username", nullable = false)
    private Creative author;

    @ManyToOne
    private Portfolio portfolio;

    @ManyToOne
    private Project project;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(nullable = false)
    private String file;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDateTime publicationDateTime;

    private String description;

    private Set<String> keywords;

    @ManyToMany
    @JoinTable(name = "elaborate_collaborators", joinColumns = @JoinColumn(name = "elaborate_id"), inverseJoinColumns = @JoinColumn(name = "collaborator", referencedColumnName = "username"))
    private List<Creative> collaborators = new ArrayList<Creative>();

    @ManyToOne(fetch = FetchType.EAGER)
    private Collection collection = null;

}