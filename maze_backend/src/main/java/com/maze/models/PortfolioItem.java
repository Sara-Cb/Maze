package com.maze.models;

import java.time.LocalDate;

import com.maze.enumerations.PortfolioItemType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
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

    @ManyToOne(fetch = FetchType.EAGER)
    private Portfolio portfolio;

    @OneToOne
    private Collection collection;

    @OneToOne
    private Project project;

    @OneToOne
    private Elaborate elaborate;

    private boolean show = true;

    @Column
    @Enumerated(EnumType.STRING)
    private PortfolioItemType type;

    private LocalDate createdAt;

    private LocalDate updatedAt;

}
