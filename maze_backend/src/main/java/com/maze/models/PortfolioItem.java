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

    @ManyToOne
    private Portfolio portfolio;

    @OneToOne(optional = true, fetch = FetchType.LAZY)
    private Collection collection;

    @OneToOne(optional = true)
    private Project project;

    @OneToOne(optional = true)
    private Elaborate elaborate;

    private boolean show = true;

    @Column
    @Enumerated(EnumType.STRING)
    private PortfolioItemType type;

    private LocalDate createdAt;

    private LocalDate updatedAt;

    public PortfolioItem(Elaborate elaborate, Portfolio portfolio) {
        this.elaborate = elaborate;
        this.collection = null;
        this.project = null;
        this.portfolio = portfolio;
        this.createdAt = LocalDate.now();
        this.type = PortfolioItemType.ELABORATE;
    }

    public PortfolioItem(Collection collection, Portfolio portfolio) {
        this.elaborate = null;
        this.collection = collection;
        this.project = null;
        this.portfolio = portfolio;
        this.type = PortfolioItemType.COLLECTION;
    }

    public PortfolioItem(Project project, Portfolio portfolio) {
        this.elaborate = null;
        this.collection = null;
        this.project = project;
        this.portfolio = portfolio;
        this.type = PortfolioItemType.PROJECT;
    }

}
