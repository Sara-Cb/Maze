package com.maze.models;

import java.time.LocalDateTime;
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

    @ManyToOne(fetch = FetchType.EAGER)
    private Collection collection = null;

    @ManyToOne
    private Project project = null;
}