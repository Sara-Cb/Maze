package com.maze.models;

import java.sql.Timestamp;

import com.maze.enumerations.FeedItemType;

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
@Table(name = "feed_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Timestamp publicationDateTime;

    @ManyToOne
    private Creative author;

    @OneToOne(optional = true)
    private Collection collection;
    /*
     * @OneToOne(optional = true)
     * private Project project;
     */
    @Enumerated(EnumType.STRING)
    private FeedItemType type;

    private String caption;

}
