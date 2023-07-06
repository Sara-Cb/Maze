package com.maze.models;

import java.time.LocalDate;

import com.maze.enumerations.PortfolioItemType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "portfolio_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Portfolio portfolio;

    @OneToOne(cascade = CascadeType.ALL)
    private Collection collection;

    @OneToOne(cascade = CascadeType.ALL)
    private Project project;

    @OneToOne(cascade = CascadeType.ALL)
    private Elaborate elaborate;

    private boolean show = true;

    @Column
    @Enumerated(EnumType.STRING)
    private PortfolioItemType type;

    private LocalDate createdAt;

    private LocalDate updatedAt;

}
